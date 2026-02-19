import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<{
    id: string;
    emailAddress: string;
    role: string;
  } | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    console.log("Logged In user: ", user);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log("we got it: ", data);

        setUser({
          id: data.user._id,
          emailAddress: data.user.emailAddress,
          role: data.role,
        });
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  const contextValue = {
    user,
    setUser,
    loadingUser,
    setLoadingUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
