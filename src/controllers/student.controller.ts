import Task from "../models/task.model";

export const getTasks = async (req: any, res: any) => {
  const tasks = await Task.find({ studentId: req.user.id });
  res.json(tasks);
};

export const updateTask = async (req: any, res: any) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Task updated" });
};
