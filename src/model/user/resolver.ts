import { prismaClient } from "../../db/index";

const queries = {
  queryUser: async (): Promise<void> => {
    try {
      await prismaClient.user.findMany();
    } catch (err) {
      console.log("ERROR: queryUser ", err);
    }
  },
};

const mutations = {
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
    console.log("INPUT ", message.email, message.name, message.password, root);
    try {
      await prismaClient.user.create({
        data: {
          email: message.email,
          name: message.name,
          password: message.password,
        },
      });
    } catch (err) {
      console.log("ERROR of createUser: ", err);
    }
  },
};

const resolvers = { queries, mutations };
export default resolvers;
