import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), /** Other requirements for complexity can be added here */
    body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
];