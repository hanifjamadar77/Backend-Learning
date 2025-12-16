import {Router} from "express";

const authRouter = Router();

authRouter.post("/sign-in", (req,res) => res.send(message = "Sign-In Route"));
authRouter.post("/sign-up", (req,res) => res.send(message = "Sign-Up Route"));  
authRouter.post("/sign-out", (req,res) => res.send(message = "Sign-Out Route"));

export default authRouter;