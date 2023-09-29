import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import User from "./model/user";
import Tweet from "./model/tweet";
const typeDefs = `#graphql
  ${User.typesUser}
  ${Tweet.typesTweet}
`;
console.log("DATA ", User.typesUser, User.resolvers);
const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Tweet.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Tweet.resolvers.mutations,
  },
};
// const getUser = async (token: string): Promise<void> => {
//   console.log(token);
// };
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Fastify, Lambda, etc.

    // For `startStandaloneServer`, the `req` and `res` objects are
    // `http.IncomingMessage` and `http.ServerResponse` types.
    // https://www.apollographql.com/docs/apollo-server/data/context
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";
      console.log("TOKEN FROM APOLLO ", token);
      // Try to retrieve a user with the token
      // const user = await getUser(token);
      // Add the user to the context
      return { token };
    },
  });
  console.log("URL IS", `${url}`);
};
start();
