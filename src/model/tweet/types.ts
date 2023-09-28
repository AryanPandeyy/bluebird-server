const typesTweet = `
type Tweet {
  id: ID
  content: String
  author: User
}

input createTweetInput {
 content: String
}

type Query {
  queryTweets: [Tweet]
}


input createTweetInput {
  content: String
  authorId: String
}

type Mutation {
  createTweet(message: createTweetInput): ID
}
`;

export default typesTweet;
