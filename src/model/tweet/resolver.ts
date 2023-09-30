import { prismaClient } from "../../db/index";

const queries = {
  queryTweets: async (): Promise<any> => {
    try {
      const result = await prismaClient.tweets.findMany({
        include: {
          author: true,
        },
      });
      return result;
    } catch (err) {
      console.log("ERROR: queryUser ", err);
    }
  },
};

const mutations = {
  createTweet: async (root: any, args, contextValue, info): Promise<void> => {
    console.log("INPUT from createTweet ", args, root);
    const { userId } = contextValue;
    console.log("Context Value ", userId, contextValue, info);
    try {
      await prismaClient.tweets.create({
        data: {
          content: args.content,
          authorId: userId.userId,
        },
      });
    } catch (err) {
      console.log("ERROR of createTweet : ", err);
    }
  },
};

const resolvers = { queries, mutations };
export default resolvers;
