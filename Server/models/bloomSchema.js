import mongoose from "mongoose";
const bloomSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    like:{
        type: [mongoose.Schema.Types.ObjectId],
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})

export const Bloom = mongoose.model("Bloom",bloomSchema)