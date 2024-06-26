const typeDefs = `#graphql
type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
    author: Author
    createdAt: String
}

type Author {
    _id: ID
    name: String
    username: String
    email: String
}

type Comment {
    content: String
    username: String
    createdAt: String
}

type Like {
    username: String
}

input NewPost {
    content: String!
    tags: String
    imgUrl: String
}

input NewLike {
    postId: String!
}

input NewComment {
    postId: String!
    content: String!
}

type Query {
    findAllPost: [Post]
    findPostById(_id: ID!): Post
}

type Mutation {
    createPost(newPost: NewPost): Post #NewPost -> nama argument, NewPost setelahnya, nama inputnya, untuk Post terakhir adalah yang ingin kita return
    likePost(newLike:NewLike): Post
    addComment(newComment: NewComment): Post
}
`;

module.exports = typeDefs;
