import mongoose from "mongoose";

const UserSchema =  new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    background_img:Buffer
})
const userModel= mongoose.model('user',UserSchema)
export {userModel}