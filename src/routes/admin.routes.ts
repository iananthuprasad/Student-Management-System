import { Router } from "express";
import { addAdmin,updateAdmin , addStudent,getAllStudents,getStudentById,updateStudent, deleteStudent, assignTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/admin.controller";
import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";

const router = Router();

router.post("/admin", addAdmin);
router.put("/admin",auth,isAdmin, updateAdmin);


// Create student
router.post("/students", auth, isAdmin, addStudent);

// Get all students
router.get("/students", auth, isAdmin, getAllStudents);

// Get single student by ID
router.get("/students/:id", auth, isAdmin, getStudentById);

// Update student by ID
router.put("/students/:id", auth, isAdmin, updateStudent);

// Delete student by ID
router.delete("/students/:id", auth, isAdmin, deleteStudent);


// Assign / create task
router.post("/tasks", auth, isAdmin, assignTask);

// Get all tasks
router.get("/tasks", auth, isAdmin, getAllTasks);

// Get single task by ID
router.get("/tasks/:id", auth, isAdmin, getTaskById);

// Update task by ID
router.put("/tasks/:id", auth, isAdmin, updateTask);

// Delete task by ID
router.delete("/tasks/:id", auth, isAdmin, deleteTask);

export default router;
