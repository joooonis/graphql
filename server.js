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

const users = [
  {
    id: '1',
    username: 'John',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: '2',
    username: 'Jane',
    firstName: 'Jane',
    lastName: 'Lee',
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
    firstName: String!
    lastName: String!
    fullname: String
  }

  type Query {
    AllTweets: [Tweet!]!
    Tweet(id: ID!): Tweet
    AllUsers: [User!]!
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
    AllUsers: () => users,
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
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) {
        return false;
      }
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },

  User: {
    fullname: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
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
