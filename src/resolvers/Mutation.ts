import { GraphQLContext } from "../context";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/verifyToken";
import { User, Post } from "../types";
import { generateToken } from "../utils";
import { GraphQLError } from "graphql";
dotenv.config();

const signup = async (parent: unknown, args: User, context: GraphQLContext) => {
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  return {
    token,
    user,
  };
};

const login = async (parent: unknown, args, context: GraphQLContext) => {
  const { email, password } = args;
  const user = await context.prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid Password");

  const token = generateToken(user.id);

  return {
    token,
    user,
  };
};

const createPost = async (
  parent: unknown,
  args: Post,
  context: GraphQLContext
) => {
  const userId = verifyToken(context);
  const newPost = await context.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      author: { connect: { id: userId } },
    },
  });

  return newPost;
};

const updatePost = async (parent: unknown, args, context: GraphQLContext) => {
  const userId = verifyToken(context);
  if (args.title?.trim() !== "" && args.content?.trim()) {
    const updatedPost = await context.prisma.post.update({
      where: { id: args.id, authorId: userId },
      data: {
        title: args?.title,
        content: args?.content,
      },
    });
    return updatedPost;
  } else {
    throw new GraphQLError("Atleast one argument should be present", {
      extensions: {
        code: "ARGUMENT_MISSING",
      },
    });
  }
};

const deletePost = async (parent: unknown, args, context: GraphQLContext) => {
  const userId = verifyToken(context);
  const post = await context.prisma.post.findUnique({ where: { id: args.id } });
  if (!post) throw new Error("Post not found");
  if (userId !== post.authorId)
    throw new Error("Not authorized to delete this post");
  const deletedPost = await context.prisma.post.delete({
    where: { id: args.id, authorId: userId },
  });
  return deletedPost;
};

const Mutation = { signup, login, createPost, updatePost, deletePost };

export default Mutation;
