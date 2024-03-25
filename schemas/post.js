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

input NewLike {
    username: String!
}

input NewComment {
    content: String!
    username: String!
}

type Query {
    findAllPost: [Post]
    findPostsById(id: ID!): Post
}

type Mutation {
    createPost(newPost: NewPost): Post #NewPost -> nama argument, NewPost setelahnya, nama inputnya, untuk Post terakhir adalah yang ingin kita return
    likePost(newLike:NewLike): Like
    addComment(newComment: NewComment): Post
}
`;

module.exports = typeDefs;
