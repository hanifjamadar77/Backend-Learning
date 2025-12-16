import mongoose from "mongoose";
import { DB_URI , NODE_ENV} from "../config/env.js";

if(!DB_URI){
    throw new Error("Database connection string is not defined in environment variables");
}

const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to the database successfully in ${NODE_ENV} mode`);
    }catch{
        console.error("Failed to connect to the database");
        process.exit(1);
    }
}

export default connectToDatabase;