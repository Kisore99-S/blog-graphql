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
};
