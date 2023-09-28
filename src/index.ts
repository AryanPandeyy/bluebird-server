import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import User from "./model/user";
const typeDefs = `#graphql
  ${User.typesUser}
`;
console.log("DATA ", User.typesUser, User.resolvers);
const resolvers = {
  Query: {
    ...User.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
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
