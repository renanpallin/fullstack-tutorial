import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import Login from "./pages/login";

// Client schema
import { resolvers, typeDefs } from "./resolvers";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const cache = new InMemoryCache();
// const link = new HttpLink({
//     uri: "http://localhost:4000/",
// });
const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: "http://localhost:4000/graphql",
        headers: {
            authorization: localStorage.getItem("token"),
        },
    }),
    typeDefs,
    resolvers,
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem("token"),
        cartItems: [],
    },
});

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

ReactDOM.render(
    <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN}>
            {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
        </Query>
    </ApolloProvider>,
    document.getElementById("root")
);

// client.query({
//     query: gql`
//         query GetLaunch {
//             launch(id: 56) {
//                 id
//                 mission {
//                     name
//                 }
//             }
//         }
//     `
// }).then(result => console.log(result))
