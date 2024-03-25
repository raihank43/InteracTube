const typeDefs = `#graphql
type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
}

type Comment {
    content: String
    username: String
    authorId: String
}

type Like {
    username: String
    authorId: String
}

input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
}

type Query {
    findAllPost: [Post]
    findPostsById(id: ID!): Post
}

type Mutation {
    createPost(newPost: NewPost): Post #NewPost -> nama argument, NewPost setelahnya, nama inputnya
}
`;


module.exports = typeDefs