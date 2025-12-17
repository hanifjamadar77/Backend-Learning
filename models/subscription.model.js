import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type :String,
        required :[true, 'Subsciption price is required'],
        trim: true,
        minLength : 2,
        maxLangth : 100,
    },

    price:{
        type : Number,
        required : [true, 'Subscription price is required'],
        min : [0, 'Price must be greater than 0'],
    },

    currency:{
        type: String,
        enum : ['USD','EUR','GBP'],
        default : 'USD',
    },
    frequency :{
        type : String,
        enum : ['daily', 'weekly', 'monthly', 'yearly'],
    },

    catrgory :{
        type:String,
        enum:['sports', 'news', 'entertainment', 'education', 'productivity', 'other'],
        required : true
    },
    paymentMethod :{
        type : String,
        required: true,
        trim:true,
    },
    status:{
        type : String,
        enum : ['active', 'canceled', 'expired'],
        default : 'active',
    },
    startDate:{
        type :Date,
        required : true,
        validate : {
            validator :(value) => value <= new Date(),
            message : "Start date cannot be in the future",
        }
    },
     renewalDate:{
        type :Date,
        validate : {
            validator : function (value) {
                return value > this.startDate;
            },
            message : "Renewal date must be after start date",
        }
    },

    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        index : true,
    }

}, {timestamps : true});

// Auto-calculate renewal date is missing
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriod ={
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365,   
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }  
    
    if(!this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;