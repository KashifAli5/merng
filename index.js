const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');   
const { MONGODB } = require('./config');


const typeDefs = require('./graphql/typeDefs'); 
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connecting with mongodb
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('DB connnected');
        return server.listen({ port: 5006});
    })
    .then((res) => {
        console.log(`server running at ${res.url}`)
    })
 