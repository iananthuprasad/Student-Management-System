import Student from "../models/student.model";
import Task from "../models/task.model";
import { hashPassword } from "../utils/hash";

export const addStudent = async (req: any, res: any) => {
  req.body.password = await hashPassword(req.body.password);
  await Student.create(req.body);
  res.json({ message: "Student added" });
};

export const assignTask = async (req: any, res: any) => {
  await Task.create(req.body);
  res.json({ message: "Task assigned" });
};
