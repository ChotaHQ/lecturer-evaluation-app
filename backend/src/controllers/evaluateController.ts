import { Request, Response } from "express";
import Lecturer from "../models/Lecturer";
import Student from "../models/Student";
import Course from "../models/Course";
import EvaluationMetadata from "../models/EvaluationMetadata";
import ovrRatingQueue from "../queues/ovrRatingQueue";
import deptRatingQueue from "../queues/deptRatingQueue";
import facultyRatingQueue from "../queues/facultyRatingQueue";
import courseRatingQueue from "../queues/courseRatingQueue";

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

  const {
    matricNum,
    faculty,
    department,
    courseCode,
    lecturerID,
    questionRatings,
  } = formData;

  try {
    const hasRated = await EvaluationMetadata.findOne({
      matricNum,
      lecturerID,
      courseCode,
    });

    if (hasRated) {
      return res.status(409).json({
        message: "You have rated this lecturer before on this same course",
      });
    }

    const ratingSum = (
      Object.values(formData.questionRatings) as number[]
    ).reduce((sum: number, value: number) => sum + value, 0);

    const evaluationMetadata = new EvaluationMetadata({
      matricNum,
      faculty,
      department,
      courseCode,
      lecturerID,
      questionRatings,
      questionRatingsSum: ratingSum,
    });

    await evaluationMetadata.save();

    res.status(201).json({ message: "Evaluation submitted successfully" });

    const jobOptions = {
      attempts: 3,
      backoff: { type: "exponential" as const, delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false,
    };

    await Promise.all([
      ovrRatingQueue.add("calculate-ovr-rating", { lecturerID }, jobOptions),
      deptRatingQueue.add(
        "calculate-dept-rating",
        { lecturerID, department },
        jobOptions,
      ),
      facultyRatingQueue.add(
        "calculate-faculty-rating",
        { lecturerID, faculty },
        jobOptions,
      ),
      courseRatingQueue.add(
        "calculate-course-rating",
        { lecturerID, courseCode },
        jobOptions,
      ),
    ]).catch((err) => console.error("Failed to add jobs to queue:", err));
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    return res.status(500).json({
      message:
        "An error occured in submitting your evaluation! Please try again",
    });
  }
};
