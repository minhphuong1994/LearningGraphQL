import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import { typeDefs } from "./schema";

//server setup
const server = new ApolloServer({
    typeDefs    //defines how the Graph (obj nodes) looks like including their relationship
    //resolvers //defines handler to handle the requests
})

const {url} = await startStandaloneServer(server,{
    listen: {
        port:4000
    }
})

console.log("Server ready at port", 4000)