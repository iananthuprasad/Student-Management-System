import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  req.user = jwt.verify(token, process.env.JWT_SECRET as string);
  next();
};
