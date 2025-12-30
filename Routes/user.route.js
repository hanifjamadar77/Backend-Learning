import {Router} from "express";
import { getUsers, getUser } from "../controller/user.controller.js";
import authorize from "../middelwares/auth.middleware.js";  

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req,res) => res.send({title : "CREATE a new user"}));
userRouter.put("/:id", (req,res) => res.send({title : "UPDATE user Details"}));
userRouter.delete("/:id", (req,res) => res.send({title : "DELETE a user"}));

export default userRouter;