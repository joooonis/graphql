import { ApolloServer, gql } from 'apollo-server';

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
`;

const server = new ApolloServer({
  typeDefs,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
