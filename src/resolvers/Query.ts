import { GraphQLContext } from "../context";
import { verifyToken } from "../middleware/verifyToken";

const allPosts = async (
  parent: unknown,
  args: unknown,
  context: GraphQLContext
) => {
  const userId = verifyToken(context);
  const posts = await context.prisma.post.findMany({
    where: { authorId: userId },
  });
  return posts;
};

const allUsers = async (
  parent: unknown,
  args: unknown,
  context: GraphQLContext
) => {
  const users = await context.prisma.user.findMany();
  return users;
};

const Query = { allUsers, allPosts };

export default Query;
