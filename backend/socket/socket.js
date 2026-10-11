import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { corsOrigin } from "../utils/allowedOrigins.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true, // handshake ke saath token cookie aane do
  },
});

// userId -> Set of socketIds (ek user ke multiple tabs/devices ho sakte hain)
const userSockets = new Map();

const getOnlineUsers = () => [...userSockets.keys()];

// Handshake pe JWT cookie verify karo; client ki bheji hui userId pe trust nahi karna
io.use((socket, next) => {
  try {
    const { token } = cookie.parse(socket.handshake.headers.cookie || "");
    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    socket.userId = decoded.id.toString();
    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  const userId = socket.userId;
  console.log("User Connected", socket.id);

  // Har user apne userId wale room me join karta hai, messages us room pe emit hote hain
  socket.join(userId);

  if (!userSockets.has(userId)) userSockets.set(userId, new Set());
  userSockets.get(userId).add(socket.id);

  io.emit("getOnlineUser", getOnlineUsers());

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const sockets = userSockets.get(userId);
    sockets?.delete(socket.id);
    // Offline tabhi jab user ka aakhri tab bhi band ho jaye
    if (!sockets?.size) userSockets.delete(userId);
    io.emit("getOnlineUser", getOnlineUsers());
  });
});

export { io, server, app };
