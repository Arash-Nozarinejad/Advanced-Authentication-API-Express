import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import authRouter from '@/routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('api/auth', authRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});