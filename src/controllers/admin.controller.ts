import Student from "../models/student.model";
import Admin from "../models/admin.model";
import Task from "../models/task.model";
import { hashPassword } from "../utils/hash";
let ObjectId = require("mongodb").ObjectId;
import { Request, Response } from "express";

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await hashPassword(password);
    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.token; 
    const { name, email, password } = req.body;
    const admin = await Admin.findById(token.id);
    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Admin not found"
      });
      return;
    }

    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email;

    // If password is provided → hash it
    if (password) {
      admin.password  = await hashPassword(password);
    }

    await admin.save();
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, department, password } = req.body;
    const token = req.token
    const existingStudent = await Student.findOne({ email , adminId: new ObjectId(token.id) });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const student = await Student.create({
      name,
      email,
      department,
      password: hashedPassword,
      adminId: new ObjectId(token.id),
    });

    res.status(201).json({ message: "Student added successfully",data:student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const token = req.token;
    if (!token?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const students = await Student.find({
      adminId: new ObjectId(token.id),
    }).select("-password");

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }
    const student = await Student.findById(id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, department, password } = req.body;

    const token = req.token as any;
    const adminId = token?.id;

    if (!adminId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // ✅ Validate ID
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Student ID" });
      return;
    }

    // ✅ Find student under this admin
    const student = await Student.findOne({ _id: id, adminId });
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }

    // ✅ Email duplicate check (excluding current student)
    if (email) {
      const existingStudent = await Student.findOne({
        email,
        adminId,
        _id: { $ne: id },
      });

      if (existingStudent) {
        res.status(400).json({
          success: false,
          message: "Email already in use by another student",
        });
        return;
      }

      student.email = email;
    }

    // ✅ Update other fields
    if (name) student.name = name;
    if (department) student.department = department;
    if (password) {
      student.password = await hashPassword(password);
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
      if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const assignTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, studentId, dueTime, priority } = req.body;
    const token = req.token
    const task = await Task.create({
      title,
      description,
      studentId,
      dueTime,
      priority,
      adminId: token.id
    });

    res.status(201).json({
      success: true,
      message: "Task assigned successfully",
      data: task
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.token
    if (!token?.id) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }
    const tasks = await Task.find({adminId: new ObjectId(token.id)}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }

    const task = await Task.findById(id)
      .populate("studentId", "name email department");

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, dueTime, status, priority, studentId } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueTime, status, priority, studentId },
      { new: true }
    )

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

