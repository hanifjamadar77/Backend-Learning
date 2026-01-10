import dayjs from 'dayjs';
import { serve } from '@upstash/workflow/express';
import Subscription from '../models/subscription.model.js';

const REMINDES = [7, 5, 2, 1];

export const workflowController = serve(async (context) =>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Subscription for ${subscription.user.email} has expired.`);
        return;
    }

    for(const daysBefore of REMINDES){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if(reminderDate.isAfter(dayjs())){
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, renewalDate)
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);

    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
}

const sleepUntilReminder = async (context, label , date) =>{
    console.log(`Sleeping until ${label} reminder for subscription ${date.toISOString()}`);
    await context.sleepUntil(date.toDate());
}

const triggerReminder = async (context, label ) =>{
    return await context.run(label, ()=>{
        console.log(`Triggering ${label} reminder`);
        // send email, SMS, push notification, etc.
    })
}