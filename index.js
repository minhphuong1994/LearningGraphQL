import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import { typeDefs } from "./schema.js";
import db from "./_db.js" //mock database

const resolvers = {
    Query:{
        games(){ //must be the same name as the entry point defined in the Schema Query type (schem.js file)
            return db.games //return value must be the same type with what defined in the Schema Query type
        },
        authors(){
            return db.authors
        },
        reviews(){
            return db.reviews
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