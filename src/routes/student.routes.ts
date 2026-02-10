import { Router } from "express";
import { getTasks, updateTask } from "../controllers/student.controller";
import { auth } from "../middleware/auth.middleware";
import { isStudent } from "../middleware/role.middleware";

const router = Router();
router.get("/tasks", auth, isStudent, getTasks);
router.patch("/tasks/:id", auth, isStudent, updateTask);
export default router;
