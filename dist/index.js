"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const user_1 = __importDefault(require("./model/user"));
const typeDefs = `#graphql
  ${user_1.default.types}
`;
console.log("DATA ", user_1.default.types, user_1.default.resolvers);
const resolvers = {
    Query: Object.assign({}, user_1.default.resolvers.queries),
    Mutation: Object.assign({}, user_1.default.resolvers.mutations),
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const start = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log("URL IS", `${url}`);
};
start();
//# sourceMappingURL=index.js.map