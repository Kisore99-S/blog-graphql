import { GraphQLContext } from "../context";
import Mutation from "./Mutation";
import Query from "./Query";

export const resolvers = {
  Mutation,
  Query,
  User: {
    posts: async (user, args: unknown, context: GraphQLContext) => {
      return context.prisma.post.findMany({ where: { authorId: user.id } });
    },
  },
  Post: {
    author: async (parent, args: unknown, context: GraphQLContext) => {
      // return context.prisma.user.findUnique({ where: { id: post.authorId } });
      return context.loaders.authorLoader.load(parent.authorId);
    },
  },
};
