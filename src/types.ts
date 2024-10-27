export type User = {
  name: string;
  displayName: string;
  email: string;
  password: string;
};

export type Post = {
  title: string;
  content: string;
  authorId: string;
};
