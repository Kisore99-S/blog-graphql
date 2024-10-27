import { PrismaClient } from "@prisma/client";
import { createLoaders } from "./loaders";

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  loaders;
};

export async function createContext(request: any): Promise<GraphQLContext> {
  return {
    ...request,
    prisma,
    loaders: createLoaders(prisma),
  };
}
