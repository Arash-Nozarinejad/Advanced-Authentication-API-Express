import { Router } from "express";
import { AuthRequest } from "../types/auth.types";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { registerValidation, loginValidation } from "@/validation/auth.validation";

const router = Router();

router.post('/login', validate(loginValidation), loginUser);
router.post('/register', validate(registerValidation),registerUser);
router.get('/me', authenticate, (req: AuthRequest, res) => {
    res.json({ user: req.user })
});

export default router;