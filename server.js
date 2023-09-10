import { ApolloServer, gql } from 'apollo-server';

const tweets = [
  {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  {
    id: '2',
    text: 'Bye World',
    userId: '2',
  },
];

const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
    userId: ID!
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    tweets: [Tweet]
  }

  type Query {
    AllTweets: [Tweet!]!
    Tweet(id: ID!): Tweet
  }

  type Mutation {
    createTweet(text: String!, userId: ID!): Tweet
    deleteTweet(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    AllTweets: () => tweets,
    Tweet: (_, args) => {
      const { id } = args;
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    createTweet: (_, args) => {
      const { text, userId } = args;
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet: (_, args) => {
      const { id } = args;
      const twwet = tweets.find((tweet) => tweet.id === id);
      if (!twwet) {
        return false;
      }
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
