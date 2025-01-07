import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import router from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import { generalLimiter } from './middleware/rate-limit.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(generalLimiter)

app.use('/api/auth', router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});