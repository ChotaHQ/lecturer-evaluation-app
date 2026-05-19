export type LecturerDetails = {
  lecturerName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  faculty: string;
  department: string;
  ratedCourses: {
    courseCode: string;
    avgRating: number;
    courseTitle: string;
    numOfRatings: number;
  }[];
  ovrRating: number;
  numOfRatingsForOvrRating: number;
  deptRating: number;
  numOfRatingsForDeptRating: number;
  facultyRating: number;
  numOfRatingsForFacultyRating: number;
  lecturerID: string;
};
