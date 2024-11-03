
// 5 datatypes in GraphQL schema: Int, Float, String, Boolean, ID (! means NULL NOT ALLOWED)
// Only fields defined in the schema can be returned by GraphQL
export const typeDefs = `#graphql
    type Game{
        id: ID!
        title: String!,
        platform: [String!]!
        reviews: [Review!]
    }
    type Review{
        id: ID!
        rating: Int!
        content: String!
        game: Game! #relationship of Review and Game
        author: Author!
    }
    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews:[Review!]
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