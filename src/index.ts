import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import User from "./model/user";
import Tweet from "./model/tweet";
import { IncomingMessage } from "http";
import { verifyJWT } from "./model/token/jwt";
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
const getUser = (req: IncomingMessage): any => {
  // Get the user token from the headers.
  // https://www.apollographql.com/tutorials/side-quest-auth/02-authentication-identifying-users
  // https://www.howtographql.com/graphql-js/6-authentication/
  const authHeader = req.headers.authorization || "";
  console.log("AUTHHEADER FROM CONTEXT ", authHeader);
  const token = authHeader.split(" ")[1];
  console.log("TOKEN FROM CONTEXT ", token);
  if (token == "null") {
    return null;
  }
  if (!token) {
    return null;
    // throw new Error("No token found");
  }
  const { userId } = verifyJWT(token, "123");
  console.log(userId);
  // Try to retrieve a user with the token
  // const user = await getUser(token);
  // Add the user to the context
  return userId;
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    // https://www.apollographql.com/docs/apollo-server/data/context
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Fastify, Lambda, etc.

    // For `startStandaloneServer`, the `req` and `res` objects are
    // `http.IncomingMessage` and `http.ServerResponse` types.
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {
        userId: getUser(req),
      };
    },
  });
  console.log("URL IS", `${url}`);
};
start();
