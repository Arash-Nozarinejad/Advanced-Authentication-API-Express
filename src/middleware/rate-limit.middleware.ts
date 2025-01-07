import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: 'Too many login attempts. Please try again later.' }
});

export const generalLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests. Please try again later.' }
});