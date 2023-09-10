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

const server = new ApolloServer({
  typeDefs,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
