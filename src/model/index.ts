// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// // import { prismaClient } from "../db/index";
// import User from "./user";
// const typeDefs = `#graphql
//   ${User.types}
// `;
// const resolvers = {
//   Query: {
//     ...User.resolvers.Query,
//   },
//   Mutation: {
//     ...User.resolvers.Mutation,
//   },
// };
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// const start = async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log("URL IS", `${url}`);
// };
// start();
