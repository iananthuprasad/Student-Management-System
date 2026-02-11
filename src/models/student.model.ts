import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  name: String,
  email: { type: String },
  department: String,
  password: String,
  adminId: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true
    }
});

export default model("Student", studentSchema);
