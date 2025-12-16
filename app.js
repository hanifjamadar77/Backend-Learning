import express from "express";
import {PORT} from "./config/env.js";

import userRouter from "./Routes/user.route.js";
import subscriptionRouter from "./Routes/subscription.route.js";
import authRouter from "./Routes/auth.routes.js";
import connectToDatabase from "./database/mangodb.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get("/",(req,res) =>{
    res.send("Welcome to the backend service");
})

app.listen(PORT , async() =>{
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app;