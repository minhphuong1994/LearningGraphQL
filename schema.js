
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
        authors: [Author]
        games: [Game]
    }

`