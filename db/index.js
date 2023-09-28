import { connect } from "mongoose";

// models
import userModel from "./models/user.js";
import productModel from './models/product.js'


// connect to db function 
async function Connect_DB (){
    try{    
        await connect(process.env.DB_URI,{
            dbName:'storedb',
        })
        console.log('db connected !');
    }catch(err){
        console.log('db connection field !');
        console.log(err);
    }
}

// export model 
export {userModel,productModel};

// connect function 
export default Connect_DB ;