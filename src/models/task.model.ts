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
  },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    }
}, { timestamps: true });

export default model("Task", taskSchema);
