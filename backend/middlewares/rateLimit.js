// Simple in-memory rate limiter (ek server instance ke liye kaafi hai).
// Multiple instances pe chalana ho toh Redis-based limiter use karna.
const rateLimit = ({ windowMs, max }) => {
  const hits = new Map(); // key -> { count, resetAt }

  return (req, res, next) => {
    const key = req.user?._id?.toString() || req.ip;
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= max) {
      res.set("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      return res.status(429).json({ error: "Too many requests, try again later" });
    }

    entry.count++;
    next();
  };
};

export default rateLimit;
