import { PrismaClient } from "@prisma/client";
import jwt  from "jsonwebtoken";
import { RequestHandler } from "express";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

const prisma = new PrismaClient();

export const authenticate: RequestHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Authentication required' });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            email: string;
        };

        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
            select: {id: true, email: true}
        });

        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        req.user = user;
        next();
          
    } catch (err) {
        res.status(401).json({ message: 'Invalud Token' });
    }
}