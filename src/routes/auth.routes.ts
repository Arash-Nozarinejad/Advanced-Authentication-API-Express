import { Router } from "express";
import { AuthRequest } from "../types/auth.types";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', authenticate, (req: AuthRequest, res) => {
    res.json({ user: req.user })
});

export default router;