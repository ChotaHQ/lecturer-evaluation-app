import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import Lecturer from "../models/Lecturer";
import Student from "../models/Student";
import { sendCreatePwdEmail } from "../functions/sendCreatePwdEmail";
import { sendResetPwdEmail } from "../functions/sendResetPwdEmail";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const isProduction = process.env.NODE_ENV === "production";

export const registerAdmins = async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ emailAddress });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ emailAddress, password: hashedPassword });
    await newAdmin.save();
    return res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { emailAddress } = req.body;
  const { role } = req.query;
  const { forgotPassword } = req.query;

  try {
    if (role === "admin") {
      const admin = await Admin.findOne({ emailAddress });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      } else {
        if (forgotPassword === "false") {
          const message = await sendCreatePwdEmail(
            admin.emailAddress,
            admin._id.toString(),
            "admin",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Admin has been verified and email sent" });
        } else {
          const message = await sendResetPwdEmail(
            admin.emailAddress,
            admin._id.toString(),
            "admin",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Admin has been verified for password reset" });
        }
      }
    }

    if (role === "lecturer") {
      const lecturer = await Lecturer.findOne({ emailAddress });
      if (!lecturer) {
        return res.status(404).json({ message: "Lecturer not found" });
      } else {
        if (forgotPassword === "false") {
          const message = await sendCreatePwdEmail(
            lecturer.emailAddress,
            lecturer._id.toString(),
            "lecturer",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Lecturer has been verified and email sent" });
        } else {
          const message = await sendResetPwdEmail(
            lecturer.emailAddress,
            lecturer._id.toString(),
            "lecturer",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Lecturer has been verified for password reset" });
        }
      }
    }

    if (role === "student") {
      const student = await Student.findOne({ emailAddress });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      } else {
        if (forgotPassword === "false") {
          const message = await sendCreatePwdEmail(
            student.emailAddress,
            student._id.toString(),
            "student",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Student has been verified and email sent" });
        } else {
          const message = await sendResetPwdEmail(
            student.emailAddress,
            student._id.toString(),
            "student",
          );
          console.log(message);
          return res
            .status(200)
            .json({ message: "Student has been verified for password reset" });
        }
      }
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPassword = async (req: Request, res: Response) => {
  const { userId, role } = req.query;
  const { password } = req.body;

  try {
    if (role === "admin") {
      const admin = await Admin.findById(userId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
      await admin.save();
      return res
        .status(200)
        .json({ message: "Admin password created successfully" });
    }
    if (role === "lecturer") {
      const lecturer = await Lecturer.findById(userId);
      if (!lecturer) {
        return res.status(404).json({ message: "Lecturer not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      lecturer.password = hashedPassword;
      await lecturer.save();
      return res
        .status(200)
        .json({ message: "Lecturer password created successfully" });
    }
    if (role === "student") {
      const student = await Student.findById(userId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
      await student.save();
      return res
        .status(200)
        .json({ message: "Student password created successfully" });
    }
    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    console.error("Error creating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;
  const { role } = req.query;

  try {
    let user;
    if (role === "admin") {
      user = await Admin.findOne({ emailAddress });
    } else if (role === "lecturer") {
      user = await Lecturer.findOne({ emailAddress });
    } else if (role === "student") {
      user = await Student.findOne({ emailAddress });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.emailAddress,
        role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};
