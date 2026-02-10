import { Router } from "express";
import { loginAdmin, loginStudent } from "../controllers/auth.controller";

const router = Router();
router.post("/admin/login", loginAdmin);
router.post("/students/login", loginStudent);
export default router;
