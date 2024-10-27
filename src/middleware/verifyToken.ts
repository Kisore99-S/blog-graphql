import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const verifyToken = (context: any) => {
  const Authorization: string = context.req.get("Authorization");
  if (!Authorization) throw new Error("Unauthorized - No token provided");
  const token = Authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    throw new GraphQLError("Unauthorized - Invalid User", {
      extensions: {
        code: "INTERNAL SERVER ERROR",
      },
    });
  }
};
