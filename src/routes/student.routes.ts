import { Router } from "express";
import { getAllTasks, getTaskById, updateTask } from "../controllers/student.controller";
import { auth } from "../middleware/auth.middleware";
import { isStudent } from "../middleware/role.middleware";

const router = Router();
router.get("/tasks", auth, isStudent, getAllTasks);
router.get("/tasks/:id", auth, isStudent, getTaskById);
router.patch("/tasks/:id", auth, isStudent, updateTask);
export default router;
