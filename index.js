import express from "express";
import cors from 'cors';
import dotenv from  'dotenv'
import { ApolloServer, gql } from "apollo-server-express";
import ImageRouter from './routes/image.js';
import { Server } from 'socket.io'
import http from 'http'

const app = express();

//  add cors 

app.use(cors());


// express config 

app.use(express.json());
app.use(express.urlencoded());


// dev config 
dotenv.config();

// server 
const serverApp = new http.createServer(app);


// ### Socket.io

//  socket.io config 

const io = new Server(serverApp,{cors:{origin:"http://localhost:3000"}});


io.on('connection',(socket)=>{
     console.log("new user id: ",socket.id);


    //  on message 
    socket.on('send-message',(mess)=>{
        io.emit('new-message',mess);
    });
 
});




//  ### Graphql 

// graphql resolvers and  typedefs 

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js" ;

// routes 

app.use('/upload',ImageRouter);

app.use(express.static('views'));


// upload images

app.use('/images',express.static('./upload'));


//  / route
// app.get('/',(req,res)=>{
//     const text = fs.readFileSync('./views/index.html','utf-8');
//     res.send(text)
// });


// apollo server

const server = new ApolloServer({resolvers,typeDefs});

// server function 

await server.start();
server.applyMiddleware({app});
// listening
serverApp.listen(4000,()=>{
    console.log('server is running on port 4000 !');
})


// starting the server 
// startServer()


