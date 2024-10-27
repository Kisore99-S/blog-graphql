export const typeDefs = `#graphql

type Query{
    allUsers: [User!]
    user(id: ID!): User
    allPosts: [Post!]
    post(id: ID!): Post
}

type Mutation{
    signup(name: String!,displayName: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createPost(title: String!,content: String! ): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Post!
    createComment(content: String!, postId: ID!, authorId: ID!): Comment!
}

type User{
    id: ID!
    name: String!
    displayName: String!
    email: String!
    posts: [Post!]
}

type Post{
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
    # createdAt: String!
}

type Comment{
    id: ID!
    content: String!
    post: Post!
    author: User!
    createdAt: String!
}

type AuthPayload {
  token: String
  user: User
}
`;
