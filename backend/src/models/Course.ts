import mongoose from "mongoose";

const Course = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Course", Course);
