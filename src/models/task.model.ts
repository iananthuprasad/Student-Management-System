import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  studentId: { type: Schema.Types.ObjectId, ref: "Student" },
  dueTime: Date,
  status: {
    type: String,
    enum: ["pending", "overdue", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default model("Task", taskSchema);
