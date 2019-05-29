const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();


const server = new ApolloServer({
    typeDefs,
    /*
    Apollo Server will automatically add the launchAPI and userAPI to our resolvers' context so we can easily call them.
    */
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store }),
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})