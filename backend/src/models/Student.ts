import mongoose from "mongoose";

const Student = new mongoose.Schema(
  {
    matricNum: {
      type: String,
      required: true,
    },
    jambRegNo: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    otherNames: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    stateOfOrigin: {
      type: String,
    },
    lga: {
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    nin: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    durationOfStudy: {
      type: String,
      required: true,
    },
    totalFeesPaid: {
      type: Number,
      required: true,
    },
    academicSession: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Student", Student);
