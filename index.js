import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import { typeDefs } from "./schema.js";
import db from "./_db.js" //mock database

const resolvers = {
    Query:{ //Entry points resolvers
        games(){ //must be the same name as the entry point defined in the Schema Query type (schem.js file)
            return db.games //return value must be the same type with what defined in the Schema Query type
        },
        game(_,args){
            return db.games.find((game) => game.id === args.id)
        },
        authors(){
            return db.authors
        },
        author(_,args){
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
    },
    //same obj name that's defined in the relationship in the schema file
    Game: { 
        reviews(parent){ //reviews resolver - this will be used when 'reviews' is nested in Game obj
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },
    Review:{
        author(parent){ //author resolver for 'author' nested within Review object
            return db.authors.find((author) => author.id === parent.author_id)
        },
        game(parent){ //game resolver for 'game' nested within Game object
            return db.games.find((game) => game.id === parent.id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            let checker = db.games.find((game) => game.id === args.id)
            if(checker){
                db.games = db.games.filter((game) => game.id !== args.id) //returns games whose ID does not equals the input Id
            }
            return checker
        },
        addGame(_,args){
            let gameToAdd = {
                ...args.game, //spread all fields of the input 'game' object to current obj
                id: Math.floor(Math.random()*10000).toString()
            }
            db.games.push(gameToAdd)
            return gameToAdd
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