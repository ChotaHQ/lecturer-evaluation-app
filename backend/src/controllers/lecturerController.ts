import { Request, Response } from "express";
import Lecturer from "../models/Lecturer";

export const getLecturerData = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const lecturerData = await Lecturer.findById(userId).select("-password");

    console.log("Over here: ", lecturerData);

    if (lecturerData) {
      res.status(200).json(lecturerData);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve lecturer data" });
  }
};

export const getAllLecturers = async (_req: Request, res: Response) => {
  try {
    const lecturers = await Lecturer.find(
      {},
      { lecturerName: 1, department: 1, _id: 1 },
    ).lean();

    res.status(200).json(lecturers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve all lecturers data" });
  }
};

export const getAllLecturersByDepartment = async (
  req: Request,
  res: Response,
) => {
  const { department } = req.query;

  try {
    const lecturerData =
      await Lecturer.findById(department).select("-password");

    console.log("Over here: ", lecturerData);

    if (lecturerData) {
      res.status(200).json(lecturerData);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve lecturer data" });
  }
};
