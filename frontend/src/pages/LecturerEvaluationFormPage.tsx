import { useQuery } from "@tanstack/react-query";
import LecturerEvaluationFormComponent from "../components/LecturerEvaluationFormComponent";
import { useAuthContext } from "../hooks/useAuthContext";

const LecturerEvaluationFormPage = () => {
  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["evaluationData", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/evaluate?userId=${user?.id}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch patient record");
      }

      return await res.json();
    },
  });

  if (!user?.id) return <p>Missing student ID</p>;

  if (isLoading) return null;

  if (error) return <p>Failed to load evaluation data</p>;

  return <LecturerEvaluationFormComponent evaluationData={data} />;
};

export default LecturerEvaluationFormPage;
