import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("mongoURL ==========",process.env.MONGO_URI)
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("MongoDB connected");
};
