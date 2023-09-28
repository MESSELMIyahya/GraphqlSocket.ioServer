import {gql} from 'apollo-server-express'
const typeDefs =  gql`

    type User {
        id:ID!
        name:String!
        email:String!
        products:[Product]
    }

    type Product {
        id:ID!
        title:String!
        description:String!
        image:String!
        author:User!
        price:Int!
    }

    type Query {
        users:[User] 
        products: [Product]
        user(id:ID!): User
        product(id:ID!):Product
    }

    type Mutation {
        createProduct(id:ID!,data:CreateProductTyp!):Product!
        registerNewUser(user:RegisterUserTyp!):User!

        deleteUser(id:ID!):String!
        deleteProduct(id:ID!,authorId:ID!):String!

        updateUser(id:ID!,data:RegisterUserTyp!):User
        updateProduct(id:ID!,authorId:ID!,data:CreateProductTyp!):Product!
    }


    input RegisterUserTyp {
        name:String
        email:String
    }

    input CreateProductTyp {
        title:String
        description:String
        image:String
        price:Int
    }

`;



export default typeDefs