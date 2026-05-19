import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLecturers } from "../../functions/fetchLecturers";
import { fetchLecturerById } from "../../functions/fetchLecturerById";
import type { LecturerDetails } from "../../types/LecturerDetails";
import type { LecturerResponseObj } from "../../types/LecturerResponseObj";

// ─── Highlight helper ────────────────────────────────────────────────────────

const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 rounded-sm">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const LecturerNameSearchComponent = () => {
  const [individualLecturerToSearch, setIndividualLecturerToSearch] =
    useState("");
  const [selectedLecturerId, setSelectedLecturerId] = useState<string | null>(
    null,
  );
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: lecturers = [],
    isLoading,
    isError,
    error,
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
    const trimmed = individualLecturerToSearch.trim();
    if (!trimmed) return [];
    return lecturers.filter((l) =>
      l.lecturerName.toLowerCase().includes(trimmed.toLowerCase()),
    );
  }, [individualLecturerToSearch, lecturers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndividualLecturerToSearch(e.target.value);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showDropdown =
    isFocused && individualLecturerToSearch.trim().length > 0;

  return (
    <div className="p-5">
      <h2 className="mb-3">Lecturer Name Search</h2>

      <div ref={containerRef} className="relative mb-5">
        <input
          type="text"
          value={individualLecturerToSearch}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder={
            isLoading ? "Loading lecturers..." : "Enter lecturer's name..."
          }
          disabled={isLoading || isError}
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {showDropdown && (
          <ul className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
            {isError && (
              <li className="px-3 py-2 text-sm text-red-500">
                {error?.message ?? "Something went wrong."}
              </li>
            )}

            {!isError && filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">
                No lecturers match "{individualLecturerToSearch}"
              </li>
            )}

            {!isError &&
              filtered.map((lecturer) => (
                <li
                  key={lecturer._id}
                  onClick={() => {
                    setIndividualLecturerToSearch(lecturer.lecturerName);
                    setSelectedLecturerId(lecturer._id);
                    setIsFocused(false);
                  }}
                  className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  <HighlightMatch
                    text={lecturer.lecturerName}
                    query={individualLecturerToSearch}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="p-4">
        {isLoadingDetails && (
          <p className="text-sm text-gray-500">Loading lecturer details...</p>
        )}

        {isErrorDetails && (
          <p className="text-sm text-red-500">
            {detailsError?.message ?? "Something went wrong."}
          </p>
        )}

        {lecturerDetails && !isLoadingDetails && (
          <div className="text-sm text-gray-800 space-y-4">
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

export default LecturerNameSearchComponent;
