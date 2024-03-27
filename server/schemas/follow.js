const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    following: FollowDetail
    follower: FollowDetail
}

type FollowDetail {
    _id: ID
    name: String
    email: String
}

input NewFollow {
    followingId: ID!
}

type Query {
    findFollowingDetail(_id: ID!):[Follow]
    findFollowerDetail(_id:ID!):[Follow]
}


type Mutation {
    followUser(followingId: ID!): Follow
}

`;

module.exports = typeDefs;
