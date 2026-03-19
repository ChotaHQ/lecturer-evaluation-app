import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLecturers } from "../../functions/fetchLecturers";
import { fetchLecturerById } from "../../functions/fetchLecturerById";
import type { LecturerDetails } from "../../types/LecturerDetails";
import type { LecturerResponseObj } from "../../types/LecturerResponseObj";

const LecturerCourseSearchComponent = () => {
  const [departmentToSearch, setDepartmentToSearch] = useState("");
  const [selectedLecturerId, setSelectedLecturerId] = useState<string | null>(
    null,
  );

  const {
    data: lecturers = [],
    isLoading,
    isError,
  } = useQuery<LecturerResponseObj[], Error>({
    queryKey: ["lecturers"],
    queryFn: fetchLecturers,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: lecturerDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
    error: detailsError,
  } = useQuery<LecturerDetails, Error>({
    queryKey: ["lecturer", selectedLecturerId],
    queryFn: () => fetchLecturerById(selectedLecturerId!),
    enabled: !!selectedLecturerId, // only fires when a lecturer has been selected
    staleTime: 5 * 60 * 1000,
  });

  const filtered = useMemo(() => {
    return lecturers.filter((l) => l.department === departmentToSearch);
  }, [departmentToSearch, lecturers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentToSearch(e.target.value);
  };

  return (
    <div className="p-5">
      <h2 className="mb-3">Lecturer Department Search</h2>

      <select
        name="department"
        id="department"
        value={departmentToSearch}
        onChange={handleInputChange}
        disabled={isLoading || isError}
        className="mb-5 px-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="" className="text-gray-400">
          -- Select a Department --
        </option>
        <option value="Computer Science">Computer Science</option>
        <option value="Agricultural Engineering">
          Agricultural Engineering
        </option>
        <option value="Industrial Chemistry">Industrial Chemistry</option>
        <option value="Accountancy">Accountancy</option>
        <option value="Mathematics">Mathematics</option>
      </select>

      <div className="p-4 flex justify-between">
        <div className="w-[40%]">
          {isLoadingDetails && (
            <p className="text-sm text-gray-500">Loading lecturer details...</p>
          )}

          {isErrorDetails && (
            <p className="text-sm text-red-500">
              {detailsError?.message ?? "Something went wrong."}
            </p>
          )}

          {!isError &&
            filtered.map((lecturer) => (
              <p
                key={lecturer._id}
                onClick={() => {
                  setSelectedLecturerId(lecturer._id);
                }}
                className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                {lecturer.lecturerName}
              </p>
            ))}
        </div>

        {lecturerDetails && !isLoadingDetails && (
          <div className="text-sm text-gray-800 space-y-4 bg-gray-50 p-4 rounded w-[60%] ml-2 self-start">
            {/* Basic Info */}
            <div className="space-y-1">
              <p className="font-semibold underline">Lecturer Profile</p>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {lecturerDetails.lecturerName}
              </p>
              <p>
                <span className="font-semibold">Lecturer ID:</span>{" "}
                {lecturerDetails.lecturerID}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {lecturerDetails.emailAddress}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {lecturerDetails.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Faculty:</span>{" "}
                {lecturerDetails.faculty}
              </p>
              <p>
                <span className="font-semibold">Department:</span>{" "}
                {lecturerDetails.department}
              </p>
            </div>

            {/* Ratings */}
            <div className="space-y-1">
              <p className="font-semibold underline">Ratings</p>
              <p>
                <span className="font-medium">Overall:</span>{" "}
                {lecturerDetails.ovrRating}
              </p>
              <p>
                <span className="font-medium">Department:</span>{" "}
                {lecturerDetails.deptRating}
              </p>
              <p>
                <span className="font-medium">Faculty:</span>{" "}
                {lecturerDetails.facultyRating}
              </p>
            </div>

            {/* Rated Courses */}
            {lecturerDetails.ratedCourses.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold underline">Rated Courses</p>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-1 pr-4 font-medium">Code</th>
                      <th className="py-1 pr-4 font-medium">Title</th>
                      <th className="py-1 pr-4 font-medium">Avg Rating</th>
                      <th className="py-1 font-medium">No. of Ratings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturerDetails.ratedCourses.map((course) => (
                      <tr
                        key={course.courseCode}
                        className="border-b border-gray-100"
                      >
                        <td className="py-1 pr-4">{course.courseCode}</td>
                        <td className="py-1 pr-4">{course.courseTitle}</td>
                        <td className="py-1 pr-4">{course.avgRating}</td>
                        <td className="py-1">{course.numOfRatings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {lecturerDetails.ratedCourses.length === 0 && (
              <p className="text-gray-500">No rated courses yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerCourseSearchComponent;
