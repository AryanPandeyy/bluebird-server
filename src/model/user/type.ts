const typesUser = `#graphql
type User {
  email: String
  name: String
  password: String
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
