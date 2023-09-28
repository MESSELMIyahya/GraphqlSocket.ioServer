import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        require:true,
        type:String
    },
    description:{
        require:true,
        type:String
    },
    image:{
        require:true,
        type:String
    },
    author:{
        require:true,
        type:String
    },
    price:{
        require:true,
        type:Number
    }
});

const productModel = mongoose.models.Product || mongoose.model('Product',productSchema);

export default productModel ;