import { Request } from "express";

export interface RegisterDTO {
    email: string;
    password: string;
    name?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name?: string;
    };
}

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}