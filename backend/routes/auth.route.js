import express from "express";

import { signup, login, logout } from '../controllers/auth.controller.js';
import verifyToken from "../utils/verifyToken.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', verifyToken, login);
authRouter.post('/logout', logout);

export default authRouter;