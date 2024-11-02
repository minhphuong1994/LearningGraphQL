import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import { typeDefs } from "./schema.js";
import db from "./_db.js" //mock database

const resolvers = {
    Query:{
        games(){ //must be the same name as the entry point defined in the Schema Query type (schem.js file)
            return db.games //return value must be the same type with what defined in the Schema Query type
        },
        game(_,args){
            // in real project, this should perform some request to real database of findReviewById
            // in this project, we are finding Review that has same id with the id param coming from the request
            return db.games.find((game) => game.id === args.id)
        },
        authors(){
            return db.authors
        },
        author(_,args){
            // in real project, this should perform some request to real database of findReviewById
            // in this project, we are finding Review that has same id with the id param coming from the request
            return db.authors.find((author) => author.id === args.id)
        },
        reviews(){
            return db.reviews
        },
        review(_,args){
            // in real project, this should perform some request to real database of findReviewById
            // in this project, we are finding Review that has same id with the id param coming from the request
            return db.reviews.find((review) => review.id === args.id)
        }
    }
}

//server setup
const server = new ApolloServer({
    typeDefs,    //defines how the Graph (obj nodes) looks like including their relationship
    resolvers //defines handlers to handle the requests
})

const {url} = await startStandaloneServer(server,{
    listen: {
        port:4000
    }
})

console.log("Server ready at port", 4000)