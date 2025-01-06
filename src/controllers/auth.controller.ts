import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { RegisterDTO, LoginDTO } from "@/types/auth.types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser: RequestHandler<{}, any, RegisterDTO> = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (await prisma.user.findUnique({ where: { email } })) {
            res.status(400).json({ message: 'user already exists' });
            return;
        } { /* All database related activities could be bundled into a database file. */}

        const hashedPassword = await bcrypt.hash(password, 10); { /* All password related activities could be bundled into a utils file. */}

        const user = await prisma.user.create({
            data: {
                email, 
                password: hashedPassword, 
                name
            }
        }); { /* All database related activities could be bundled into a database file. */}

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        ); { /* All token related activities could be bundled into a utils file. */}

        res.status(201).json({
            token,
            user: {
                user: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        res.status(500).json( {message: 'Error registering user' });
    }
}

export const loginUser: RequestHandler<{}, any, LoginDTO> = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } }); { /* All database related activities could be bundled into a database file. */}

        if (! user) {
            res.status(401).json({ message: "invalid credentials" });
            return;
        }

        if (! await bcrypt.compare(password, user.password)) { { /* All password related activities could be bundled into a utils file. */}
            res.status(401).json({ message: "invalid credentials" });
            return;
        }

        const token = jwt.sign(
            {id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        ); { /* All token related activities could be bundled into a utils file. */}

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });    
    } catch (error) {
        res.status(500).json({ message: "Error loggin in"});
    }
}