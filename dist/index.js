"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const index_1 = require("./db/index");
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
        createUser: async (root, { message, }) => {
            console.log("INPUT ", message.email, message.name, message.password, root);
            try {
                await index_1.prismaClient.user.create({
                    data: {
                        email: message.email,
                        name: message.name,
                        password: message.password,
                    },
                });
            }
            catch (err) {
                console.log(err);
            }
        },
    },
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