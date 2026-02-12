import Admin from "../models/admin.model";
import Student from "../models/student.model";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin?.password) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const valid = await comparePassword(password, admin.password);

    if (!valid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = generateToken({
      id: admin._id,
      role: "admin",
    });

    res.status(200).json({ token });

  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({ message });
  }
};


export const loginStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    // Prevent user enumeration attack
    if (!student?.password) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const valid = await comparePassword(password, student.password);

    if (!valid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({
      id: student._id,
      role: "student",
      adminId: student.adminId,
    });

    res.status(200).json({ token });

  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({ message });
  }
};
