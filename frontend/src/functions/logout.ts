import { apiFetch } from "../services/api";

export const logout = async (
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      emailAddress: string;
      role: string;
    } | null>
  >,
) => {
  try {
    const data = await apiFetch("/api/auth/logout", {
      method: "POST",
    });

    if (data) {
      setUser(null);
    }
  } catch (err) {
    console.log(err);
  }
};
