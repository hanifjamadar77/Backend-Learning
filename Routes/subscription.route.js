import {Router} from "express";
import  authorize  from "../middelwares/auth.middleware.js";
import { createSubscription } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req,res) => res.send({title : "GET all subscriptions"}));

subscriptionRouter.get("/:id", (req,res) => res.send({title : "GET subscription Details"}));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req,res) => res.send({title : "UPDATE subscription"}));

subscriptionRouter.delete("/:id", (req,res) => res.send({title : "DELETE Subscription"}));

subscriptionRouter.get("/user/:id", (req,res) => res.send({title : "GET all user Subscriptions"}));

subscriptionRouter.put("/:id/cancle", (req,res) => res.send({title : "CANCEL subscription"}));

subscriptionRouter.get("/upcoming-renewals", (req,res) => res.send({title : "GET upcoming renewals"}));


export default subscriptionRouter;