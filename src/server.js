import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import {resolvers} from './resolver.js'
import {typeDefs} from './schema.js'
import {WebSocketServer} from 'web'
// 1. Construct a schema, using GraphQL schema language
// 1. Construct a schema, using GraphQL schema language
// Here we will make Employee schema using the TypeSystem data-types
// 2. Define our own data-set - Employee array


const app = express();
const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers
});
await server.start();
app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
);

// Create  WebSocket server using the HTTP server that is just set up.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });
  //Set up the WebSocket server.
  useServer({ schema }, wsServer);
httpServer.listen({ port: 4000 });
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
