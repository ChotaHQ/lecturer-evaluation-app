import type { LecturerResponseObj } from "../types/LecturerResponseObj";

export const fetchLecturers = async (): Promise<LecturerResponseObj[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lecturer/all`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch lecturers");
  }

  return await res.json();
};
