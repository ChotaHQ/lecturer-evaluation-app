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
    ratedCourses: {
      type: [
        {
          courseCode: { type: String, required: true },
          courseTitle: { type: String, required: true },
          avgRating: {
            type: Number,
            min: 1,
            max: 5,
          },
        },
      ],
      default: [],
    },
    ovrRating: {
      type: Number,
      default: 0,
    },
    numOfRatingsForOvrRating: {
      type: Number,
      default: 0,
    },
    deptRating: {
      type: Number,
      default: 0,
    },
    numOfRatingsForDeptRating: {
      type: Number,
      default: 0,
    },
    facultyRating: {
      type: Number,
      default: 0,
    },
    numOfRatingsForFacultyRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lecturer", Lecturer);
