import express from "express";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import studentRoutes from "./routes/student.routes";

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);

export default app;
