import {Router} from "express";
import { signIn, signUp, signOut } from "../controller/auth.controller.js";

const authRouter = Router();

// /api/v1/auth/sign-up -> POST 

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);  
authRouter.post("/sign-out", signOut);

export default authRouter;