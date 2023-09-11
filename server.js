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
  """
  A Tweet with text and author
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    The full name of the user
    """
    fullname: String
  }

  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }

  type Query {
    AllTweets: [Tweet!]!
    Tweet(id: ID!): Tweet
    AllUsers: [User!]!
    AllMovies: [Movie!]!
    Movie(id: String!): Movie
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

    AllMovies: async () => {
      const response = await fetch(
        'https://yts.mx/api/v2/list_movies.json?limit=50'
      );
      const { data } = await response.json();
      return data.movies;
    },

    Movie: async (_, args) => {
      const { id } = args;
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const { data } = await response.json();
      return data.movie;
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
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) {
        return false;
      }
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },

  Tweet: {
    author: ({ userId }) => {
      return users.find((user) => user.id === userId);
    },
  },

  User: {
    fullname: ({ firstName, lastName }) => {
      return `${firstName} ${lastName}`;
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
