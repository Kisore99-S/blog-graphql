import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      return {
        message: err.message,
        code: err.extensions.code || "INTERNAL_SERVER_ERROR",
        path: err.path,
        locations: err.locations,
      };
    },
  });

  const { url } = await startStandaloneServer(server, {
    context: async (request) => createContext(request),
  });
  console.log(`Server is running at ${url}`);
}

startApolloServer();
