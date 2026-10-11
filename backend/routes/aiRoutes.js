import express from "express";
const router = express.Router();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { isAuth } from "../middlewares/isAuth.js";
import rateLimit from "../middlewares/rateLimit.js";

// Sirf logged-in users, aur har user 1 minute me max 5 generations (API cost/abuse se bachne ke liye)
router.post("/generate-post", isAuth, rateLimit({ windowMs: 60 * 1000, max: 5 }), async (req, res) => {
  try {
    const topic = typeof req.body.topic === "string" ? req.body.topic.trim() : "";
    if (!topic) return res.status(400).json({ error: "Topic required" });
    if (topic.length > 200)
      return res.status(400).json({ error: "Topic must be under 200 characters" });

    // yahan initialize karo, top pe nahi
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Write an engaging, professional LinkedIn-style social media post about: "${topic}".
    Keep it under 150 words, use a natural first-person tone, add 2-3 relevant hashtags at the end.
    Do not use markdown formatting, just plain text.`;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    res.json({ post: generatedText });
  } catch (err) {
    console.error("AI generation error:", err.message);
    res.status(500).json({ error: "Failed to generate post" });
  }
});

export default router;