import { Request, Response } from "express";
import Lecturer from "../models/Lecturer";

export const getLecturerData = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const lecturerData = await Lecturer.findById(userId).select("-password");
    if (lecturerData) {
      res.status(200).json(lecturerData);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve lecturer data" });
  }
};
