import type { Ratings } from "./Ratings";

export type LecturerEvaluationFormData = {
  matricNum: string;
  faculty: string;
  department: string;
  courseCode: string;
  lecturerID: string;
  questionRatings: Ratings;
};
