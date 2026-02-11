import { Router } from "express";
import { addStudent, assignTask } from "../controllers/admin.controller.ts";
import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";

const router = Router();
router.post("/students", auth, isAdmin, addStudent);
router.post("/tasks", auth, isAdmin, assignTask);
export default router;
