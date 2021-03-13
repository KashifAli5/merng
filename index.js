const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag'); 
const mongoose = require('mongoose');   
const { MONGODB } = require('./config');


const Post = require('./models/Post');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connecting with mongodb
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('DB connnected');
        return server.listen({ port: 5005});
    })
    .then((res) => {
        console.log(`server running at ${res.url}`)
    })
 