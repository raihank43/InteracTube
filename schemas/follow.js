const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followerId: ID
}

input NewFollow {
    followingId: ID!
    followerId: ID!
}

type Mutation {
    followUser(newFollow: NewFollow): Follow
}

`;

module.exports = typeDefs;
