import type { Ratings } from './Ratings';

export type LecturerEvaluationFormData = {
  courseCode: string;
  level: string;
  courseTitle: string;
  lecturerName: string;
  ratings: Ratings;
}