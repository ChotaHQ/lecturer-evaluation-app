import { Request, Response } from "express";
import Lecturer from "../models/Lecturer";
import Student from "../models/Student";
import Course from "../models/Course";
import EvaluationMetadata from "../models/EvaluationMetadata";

export const getEvaluationData = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const studentData = await Student.findById(userId).select(
      "firstName lastName otherNames matricNum gender level department faculty -_id",
    );

    if (studentData) {
      const lecturerNames = await Lecturer.find({
        department: studentData.department,
      }).select("lecturerName lecturerID -_id");

      const courseList = await Course.find({
        department: studentData.department,
        level: studentData.level,
      }).select("courseCode courseTitle -_id");

      const {
        firstName,
        lastName,
        otherNames,
        matricNum,
        gender,
        level,
        department,
        faculty,
      } = studentData;

      return res.status(200).json({
        department,
        faculty,
        firstName,
        gender,
        lastName,
        level,
        matricNum,
        otherNames,
        lecturerNames,
        courseList,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postEvaluationData = async (req: Request, res: Response) => {
  const { formData } = req.body;

  try {
    const ratingSum = (
      Object.values(formData.questionRatings) as number[]
    ).reduce((sum: number, value: number) => sum + value, 0);

    formData.questionRatingsSum = ratingSum;

    const {
      matricNum,
      faculty,
      department,
      courseCode,
      lecturerID,
      questionRatings,
      questionRatingsSum,
    } = formData;

    const evaluationMetadata = new EvaluationMetadata({
      matricNum,
      faculty,
      department,
      courseCode,
      lecturerID,
      questionRatings,
      questionRatingsSum,
    });

    await evaluationMetadata.save();

    return res
      .status(201)
      .json({ message: "Evaluation submitted successfully" });
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    return res.status(500).json({
      message:
        "An error occured in submitting your evaluation! Please try again",
    });
  }
};
