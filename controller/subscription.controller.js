import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user.id,
        });

        const workflowRunId = await workflowClient.trigger({
            url : `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body : {
                subscriptionId : subscription.id,
            },
            headers : {
                'Content-Type' : 'application/json',
            },
            retries : 0,
        })

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: {subscription, workflowRunId},
        });
    }catch(err){
        next(err);
    }
}

export const getUserSubscriptions = async (req, res, next)=>{
    try{
        if(req.user.id !== req.params.id){
            const error = new Error("Unauthorized access to subscriptions");
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.find({user : req.params.id});

        res.status(200).json({
            success: true,
            data: subscription,
        })
    }catch(err){
        next(err);
    }
}