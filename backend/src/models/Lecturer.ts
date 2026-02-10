import mongoose from "mongoose";

const Lecturer = new mongoose.Schema(
  {
    lecturerName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    ratedCourses: [
      {
        courseCode: { type: String, required: true },
        courseTitle: { type: String, required: true },
        avgRating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
      },
    ],
    ovrRating: {
      type: Number,
      required: true,
    },
    numOfRatingsForOvrRating: {
      type: Number,
      required: true,
    },
    deptRating: {
      type: Number,
      required: true,
    },
    numOfRatingsForDeptRating: {
      type: Number,
      required: true,
    },
    facultyRating: {
      type: Number,
      required: true,
    },
    numOfRatingsForFacultyRating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lecturer", Lecturer);
