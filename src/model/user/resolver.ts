import { prismaClient } from "../../db/index";
import { signJWT } from "../token/jwt";
import bcrypt from "bcrypt";
const queries = {
  // (parent,args,contextValue,info)
  queryUser: async (): Promise<any> => {
    try {
      const result = await prismaClient.user.findMany();
      return { result };
    } catch (err) {
      console.log("ERROR: queryUser ", err);
    }
  },
  queryUserById: async (root, id, contextValue): Promise<any> => {
    try {
      const { userId } = contextValue;
      console.log("CONTEXTVALUE QUERYUSERBYID ", contextValue);
      const result = await prismaClient.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
      return result;
    } catch (e) {
      console.log("ERROR: queryUserById ", e);
    }
  },
};

const mutations = {
  createUser: async (
    root: any,
    {
      message: args,
    }: {
      message: {
        name: string;
        password: string;
        email: string;
      };
    },
  ): Promise<any> => {
    console.log("INPUT ", args.email, args.name, args.password, root);
    const password = await bcrypt.hash(args.password, 10);
    try {
      const user = await prismaClient.user.create({
        data: {
          email: args.email,
          name: args.name,
          password: password,
        },
      });
      const token = signJWT({ userId: user.id }, "123");
      return {
        user,
        token,
      };
    } catch (err) {
      console.log("ERROR of createUser: ", err);
    }
  },
  signInUser: async (parent, args, contextValue, info): Promise<any> => {
    const user = await prismaClient.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      throw new Error("No such user found");
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Wrong Credential");
    }
    const token = signJWT({ userId: user.id, email: user.email }, "123");
    return {
      token,
      user,
    };
  },
};

const resolvers = {
  queries,
  mutations,
};
export default resolvers;
