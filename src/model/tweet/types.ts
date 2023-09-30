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



type Mutation {
  createTweet(content: String!): ID
}
`;

export default typesTweet;
