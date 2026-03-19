import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthContext } from "./../hooks/useAuthContext";

type PublicRouteComponentProps = {
  children: ReactNode;
};

const PublicRouteComponent = ({ children }: PublicRouteComponentProps) => {
  const { user, loadingUser } = useAuthContext();

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (user?.role === "student") {
    return <Navigate to="/student/evaluate" replace />;
  }

  if (user?.role === "lecturer") {
    return <Navigate to="/lecturer/dashboard" replace />;
  }

  if (user?.role === "admin") {
    console.log(user);
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRouteComponent;
