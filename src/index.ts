import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prismaClient } from "./db/index";
const typeDefs = `#graphql
    type User {
    id: String
    email: String
    name: String
    password: String
    }
type Query {
user: [User]
}
input createUserInput {
name: String
email: String
password: String
}
type Mutation {
    createUser(message: createUserInput): User
}
`;
// const createUser = async ({
//   name,
//   email,
//   password,
// }: {
//   name: string;
//   email: string;
//   password: string;
// }): Promise<void> => {
//   await prismaClient.user.create({
//     data: {
//       email: email,
//       name: name,
//       password: password,
//     },
//   });
// };
const user = [
  {
    email: "hi@gmail.com",
    name: "hi",
    password: "123",
  },
];
const resolvers = {
  Query: {
    user: () => user,
  },
  Mutation: {
    createUser: async (
      root: any,
      {
        message,
      }: {
        message: {
          name: string;
          password: string;
          email: string;
        };
      },
    ): Promise<void> => {
      console.log(
        "INPUT ",
        message.email,
        message.name,
        message.password,
        root,
      );
      try {
        await prismaClient.user.create({
          data: {
            email: message.email,
            name: message.name,
            password: message.password,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("URL IS", `${url}`);
};
start();
