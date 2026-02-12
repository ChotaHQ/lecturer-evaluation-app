import type { Ratings } from './Ratings';

export type LecturerEvaluationFormData = {
  studentName: string;
  matricNumber: string;
  gender: string;
  faculty: string;
  department: string;
  courseCode: string;
  level: string;
  courseTitle: string;
  lecturerName: string;
  ratings: Ratings;
}