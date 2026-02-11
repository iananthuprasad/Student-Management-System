import Task from "../models/task.model";
let ObjectId = require("mongodb").ObjectId;

export const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.token;
    if (!token?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const tasks = await Task.find({
      studentId: new ObjectId(token.id),
      adminId: new ObjectId(token.adminId),
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTaskById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Task ID" });
      return;
    }

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
