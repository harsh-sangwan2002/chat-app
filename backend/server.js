import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connect from './db/connect.js';
import authRouter from './routes/auth.route.js';
import notFound from './utils/middlewares/404.js';

const app = express();

// middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRouter);

// 404
app.use(notFound);

app.listen(PORT, () => {

    connect();
    console.log(`Server running on port ${PORT}.`);
})