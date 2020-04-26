import express from "express";
import { ApolloServer } from "apollo-server-express";
import { db, migrate } from "./db";
import { resolvers, typeDefs } from "./graphql";
import { HOST, PORT } from "../config";
import * as http from "http";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);

db.sync().then(async () => {
  //
  // quick and dirty db migration
  migrate();
  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`⚛ Server running at http://${HOST}:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(
      `⚛ GraphQL running at http://${HOST}:${PORT}${server.graphqlPath}\n`
    );
  });
});
