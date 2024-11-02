
// 5 datatypes in GraphQL schema: Int, Float, String, Boolean, ID (! means NULL NOT ALLOWED)
export const typeDefs = `#graphql
    type Game{
        id: ID!
        title: String!,
        platform: [String!]!
    }

    type Review{
        id: ID!
        rating: Int!
        content: String!
    }

    type Author{
        id: ID!
        name: String!
        verified: Boolean!
    }

    # exposing entry points
    type Query{
        reviews: [Review]
        # setup entry point that requires an input param of ID type as mandatory, which will return a Review obj
        review(id: ID!): Review  
        authors: [Author]
        author(id: ID!): Author
        games: [Game]
        game(id: ID!): Game
    }

`