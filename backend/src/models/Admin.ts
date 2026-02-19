import mongoose from "mongoose";

const Admin = new mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    adminID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Admin", Admin);
