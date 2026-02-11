import Admin from "../models/admin.model";
import Student from "../models/student.model";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const loginAdmin = async (req: any, res: any) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const valid = await comparePassword(req.body.password, admin.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  res.json({ token: generateToken({ id: admin._id, role: "admin" }) });
};

export const loginStudent = async (req: any, res: any) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const valid = await comparePassword(req.body.password, student.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });
  res.json({ token: generateToken({ id: student._id, role: "student",adminId: student.adminId }) });
};
