const typesUser = `#graphql
type User {
  id: ID!
  email: String
  name: String
  password: String
## an array of User in following
  following: [User]
  followers: [User]
## an array of User in Tweet
  tweet: [Tweet]
}

type Query {
  queryUser: [User]
}


input createUserInput {
  email: String
  name: String
  password: String
}

type Mutation {
  createUser(message: createUserInput): ID
}
 `;

export default typesUser;
