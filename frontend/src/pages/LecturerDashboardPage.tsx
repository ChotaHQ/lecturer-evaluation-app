import { useQuery } from "@tanstack/react-query";
import LecturerDashboardComponent from "../components/LecturerDashboardComponent";
import { useAuthContext } from "../hooks/useAuthContext";

const LecturerDashboardPage = () => {
  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lecturerData", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lecturer?userId=${user?.id}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch lecturer record");
      }

      return await res.json();
    },
  });

  if (!user?.id) return <p>Missing lecturer ID</p>;

  if (isLoading) return null;

  if (error) return <p>Failed to load lecturer's data</p>;

  return <LecturerDashboardComponent lecturerData={data} />;
};

export default LecturerDashboardPage;
