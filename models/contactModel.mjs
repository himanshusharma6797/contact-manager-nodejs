import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    name:{
        type: String,
        require: [true, "Please add the name"]
    },
    email:{
        type: String,
        require: [true, "Please add the email address"]
    },
    phone:{
        type: String,
        require: [true, "Please add the phone number"]
    }
},{timestamps: true})

const Contact = mongoose.model("Contact", contactSchema)

export default Contact