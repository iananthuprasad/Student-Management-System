export const isAdmin = (req: any, res: any, next: any) =>
  req.user.role === "admin" ? next() : res.status(403).json({ message: "Admin only" });

export const isStudent = (req: any, res: any, next: any) =>
  req.user.role === "student" ? next() : res.status(403).json({ message: "Student only" });
