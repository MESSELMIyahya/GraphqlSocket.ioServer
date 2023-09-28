

import Connect_DB , {productModel, userModel} from '../../db/index.js'



const resolvers = {

    Query:{

        users:async()=>{
            try{
                await Connect_DB()
                const users = await userModel.find({})
                return users
            }catch(e){
                console.log(err);
                return []
            }
        },
        products:async()=>{
            try{
                await Connect_DB()
                const prds = await productModel.find({})
                return prds
            }catch(e){
                console.log(err);
                return []
            }
        },

        user: async(_,args)=>{
            try{
                await Connect_DB();
                const user = await userModel.findOne({_id:args.id});
                return user ;
            }catch(e){
                console.log(err);
                return null
            }
        },

        product: async(_,args)=>{
            try{
                await Connect_DB();
                const product = await productModel.findOne({_id:args.id});
                return product ;
            }catch(e){
                console.log(err);
                return null
            }
        }

    },

    // User

    User:{
        products:async (p)=>{
            const id = p.id;
            try{
                await Connect_DB();
                const user = await userModel.findOne({_id:id});
                if(!user) return [];
                const products = await productModel.find({author:id});
                return products;
            }catch(err){
                console.log(err);
                return []
            }
        }

    },

    Product:{
        author:async (p)=>{
            const id = p.id;
            try{
                await Connect_DB();
                const prod = await productModel.findOne({_id:id});
                if(!prod) return null;
                const user = await userModel.findOne({_id:prod.author});
                if(!user) return null;
                return user;
            }catch(err){
                console.log(err);
                return null
            }
        }
    },

    // mutation

    Mutation:{
        registerNewUser:async (_,data)=>{
            try{
                await Connect_DB();
                const {email,name} = data.user;
                const userExists = await userModel.findOne({email});
                if(userExists) return userExists ;
                const user = new userModel({name,email,products:[]});
                await user.save()
                return user || null;
            }catch(err){
                // console.log(err);
                return null
            }
        },
        createProduct:async (_,data)=>{
            try{
                console.log(data);
                await Connect_DB();
                const {title,description,image,price} = data.data;
                const id = data.id
                const userExists = await userModel.findOne({_id:id});
                console.log(userExists);
                if(!userExists) return null ;
                // user exists 
                const prd = new productModel({ author:id,title,description,image,price });
                await prd.save()
                return prd || null;
            }catch(err){
                // console.log(err);
                return null
            }
        },
        deleteProduct:async (_,data)=>{
            try{
                const {authorId,id} = data;
                await Connect_DB();
                const user = await userModel.findOne({_id:authorId});
                if(!user) return 'the author not exists';
                const prod = await productModel.findOne({_id:id});
                if(!prod) return 'the product not exists';
                if(prod.author != user.id) return 'this is not allowed to delete this product ,not the owner';
                await productModel.deleteOne({_id:id});
                return 'Product Deleted';
            }catch(err){
                console.log(err);
                return 'something went wrong'
            }
        },
        deleteUser:async(_,data)=>{
            try{
                const {id} = data;
                await Connect_DB();
                const user = await userModel.findOne({_id:id});
                if(!user) return 'user not exists';
                await productModel.deleteMany({author:id});
                await userModel.deleteOne({_id:id});
                return 'User Deleted';
            }catch(err){
                console.log(err);
                return 'something went wrong'
            }
        },

        updateUser:async(_,data)=>{
            try{
                const {id,data:newData} = data;
                if(!newData) return null;
                await Connect_DB();
                const user = await userModel.findOne({_id:id});
                if(!user) return null;
                await userModel.updateOne({_id:id},{...newData});
                const newUser = await userModel.findOne({_id:id});
                return newUser;
            }catch(err){
                console.log(err);
                return 'something went wrong';
            }
        },

        updateProduct:async(_,data)=>{
            try{
                const {id,data:newData,authorId} = data;
                if(!newData) return null;
                await Connect_DB();

                // user exists
                const user = await userModel.findOne({_id:authorId});
                if(!user) return null;

                // product exists
                const product = await productModel.findOne({_id:id});
                if(!product) return null;

                // is the owner 
                if(product.author != user.id) return null

                //  update 
                await productModel.updateOne({_id:id},{...newData});
                const newUser = await productModel.findOne({_id:id});
                return newUser;
            }catch(err){
                console.log(err);
                return 'something went wrong';
            }
        }
    } 
}


export default resolvers;