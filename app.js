import express from "express";
import {PORT} from "./config/env.js";

import userRouter from "./Routes/user.route.js";
import subscriptionRouter from "./Routes/subscription.route.js";
import authRouter from "./Routes/auth.routes.js";
import connectToDatabase from "./database/mangodb.js";
import errorMiddleware from "./middelwares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middelwares/arcjet.middelware.js";
import workflowRouter from "./Routes/workflow.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);


app.get("/",(req,res) =>{
    res.send("Welcome to the backend service");
})

app.listen(PORT , async() =>{
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app;