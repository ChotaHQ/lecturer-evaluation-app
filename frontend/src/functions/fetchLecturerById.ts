import type { LecturerDetails } from "../types/LecturerDetails";

export const fetchLecturerById = async (
  id: string,
): Promise<LecturerDetails> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/lecturer?userId=${id}`,
    { credentials: "include" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch lecturer record");
  }

  return await res.json();
};
