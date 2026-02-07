import type { Question } from '../types/Question';
import type { Ratings } from '../types/Ratings';

export const questions: Question[] = [
    {
      "id": "q1" as keyof Ratings,
      "text": "Does the lecturer demonstrate deep understanding and expertise in the subject area, explaining complex concepts clearly and incorporating recent developments?"
    },
    {
      "id": "q2" as keyof Ratings,
      "text": "Does the lecturer arrive on time, stay for the entire session, and adhere to the scheduled class timetable?"
    },
    {
      "id": "q3" as keyof Ratings,
      "text": "Is the course content well-structured, with clear learning objectives, logical progression, and transparent grading policies?"
    },
    {
      "id": "q4" as keyof Ratings,
      "text": "Does the lecturer speak clearly, explain topics understandably, and ensure students grasp key concepts?"
    },
    {
      "id": "q5" as keyof Ratings,
      "text": "Does the lecturer encourage student participation, discussion, and critical thinking while welcoming diverse viewpoints?"
    }
  ]