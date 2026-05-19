import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthContext } from "./../hooks/useAuthContext";

type ProtectedRouteComponentProps = {
  children: ReactNode;
  requiredRole?: "admin" | "lecturer" | "student";
};

const ProtectedRouteComponent = ({
  children,
  //   requiredRole,
}: ProtectedRouteComponentProps) => {
  const { user, loadingUser } = useAuthContext();

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/student-login" replace />;
  }

  // if (user?.role === "") {
  //   return <Navigate to="/patient" replace />;
  // }
  // if (user?.isDoctor) {
  //   return <Navigate to="/doctor/records" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRouteComponent;
