import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "Please enter the username"]
        },
        email: {
            type: String,
            require: [true, "Please enter the username"],
            unique: [true, "Email already taken"]
        },
        password: {
            type: String,
            require: [true, "Please enter the username"]
        },
    },
    { timestamp: true, }
)

export default mongoose.model("User", userSchema)