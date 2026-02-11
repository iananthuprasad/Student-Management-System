import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  req.token = jwt.verify(token, process.env.JWT_SECRET as string);
  next();
};
