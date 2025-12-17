import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
         reqiired : [true, "UserName is required"],
         trim : true,
         maxlength : [50, "UserName cannot exceed 50 characters"],
         minLength : 2,
    },

    email :{
        type: String,
        required : [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
        match :[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email address"]
    },

    password :{
        type :String,
        required : [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
    }
});

const User = mongoose.model("User", userSchema);
export default User;