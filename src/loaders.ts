import DataLoader from "dataloader";

const batchAuthors = async (authorsIds: any, prisma: any) => {
  const authors = await prisma.user.findMany({
    where: {
      id: { in: authorsIds },
    },
  });
  const authorMap = {};
  authors.forEach((author) => (authorMap[author.id] = author));
  return authorsIds.map((id) => authorMap[id]);
};

export const createLoaders = (prisma) => ({
  authorLoader: new DataLoader((authorIds) => batchAuthors(authorIds, prisma)),
});
