import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a firstname"],
       
    },
    lastname: { 
        type: String,
        required: [true, "Please provide a lastname"],
        
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
   isAdmin : {
        type: Boolean,
        default: false,
   },
   role: {
    type: String,
    enum: ['user', 'primaryadmin','secondaryadmin'],
    default: 'user',
},
   applications:[
         {
              type: Schema.Types.ObjectId,
              ref: 'Application'
         }
    ],
   
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
