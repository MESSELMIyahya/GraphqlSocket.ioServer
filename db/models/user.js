import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    products:[
        {
            type:String,
        }
    ]
});

const userModel = mongoose.models.User || mongoose.model('User',userSchema);

export default userModel;