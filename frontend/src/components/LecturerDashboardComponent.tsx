type LecturerDashboardComponentProps = {
  lecturerData: {
    lecturerName: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    faculty: string;
    department: string;
    ratedCourses: [
      {
        courseCode: string;
        avgRating: number;
        courseTitle: string;
        numOfRatings: number;
      },
    ];
    ovrRating: number;
    numOfRatingsForOvrRating: number;
    deptRating: number;
    numOfRatingsForDeptRating: number;
    facultyRating: number;
    numOfRatingsForFacultyRating: number;
    lecturerID: string;
  };
};

const LecturerDashboardComponent = ({
  lecturerData,
}: LecturerDashboardComponentProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-5">
        <div>
          <h1 className="text-xl">Welcome {lecturerData.lecturerName}</h1>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[150px]">
            <div className="bg-gray-100 p-4 rounded flex flex-col justify-between">
              <h1 className="text-5xl">{lecturerData.ovrRating} / 5.00</h1>
              <p>
                Overall Rating ({lecturerData.numOfRatingsForOvrRating}{" "}
                {lecturerData.numOfRatingsForOvrRating > 1
                  ? "students"
                  : "student"}
                )
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded flex flex-col justify-between">
              <h1 className="text-5xl">{lecturerData.deptRating} / 5.00</h1>
              <p>
                Department Rating ({lecturerData.numOfRatingsForDeptRating}{" "}
                {lecturerData.numOfRatingsForDeptRating > 1
                  ? "students"
                  : "student"}
                )
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded flex flex-col justify-between">
              <h1 className="text-5xl">{lecturerData.facultyRating} / 5.00</h1>
              <p>
                Faculty Rating ({lecturerData.numOfRatingsForFacultyRating}{" "}
                {lecturerData.numOfRatingsForFacultyRating > 1
                  ? "students"
                  : "student"}
                )
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-lg border-gray-300 border-x-0 border-b-0 border-t-2 pt-3">
              Course Ratings
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-5">
              {lecturerData.ratedCourses.length > 0
                ? lecturerData.ratedCourses.map((course, index) => (
                    <div className="bg-gray-100 p-4 rounded" key={index}>
                      <h1 className="text-3xl">
                        {course.courseCode} ({course.avgRating} / 5.00)
                      </h1>
                      <p className="mt-5">
                        {course.courseTitle} ({course.numOfRatings}{" "}
                        {course.numOfRatings > 1 ? "students" : "student"})
                      </p>
                    </div>
                  ))
                : "No courses rated yet."}
            </div>
          </div>

          <div className="mt-5 bg-gray-100 rounded p-4  italic text-sm text-gray-600">
            * NOTE: All ratings are based on the feedback provided by students
            for the just concluded semester.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboardComponent;
