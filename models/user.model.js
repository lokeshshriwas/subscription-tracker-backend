import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    isAdmin:{
        type: Boolean,
        default : false
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
        // select: false, // prevent the password field from being returned by default in queries
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
