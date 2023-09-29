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
  createTweet: async (
    root: any,
    {
      message,
    }: {
      message: {
        content: string;
        authorId: string;
      };
    },
  ): Promise<void> => {
    console.log(
      "INPUT from createTweet ",
      message.content,
      message.authorId,
      root,
    );
    try {
      await prismaClient.tweets.create({
        data: {
          content: message.content,
          authorId: message.authorId,
        },
      });
    } catch (err) {
      console.log("ERROR of createTweet : ", err);
    }
  },
};

const resolvers = { queries, mutations };
export default resolvers;
