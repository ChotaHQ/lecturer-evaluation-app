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

  if (user) {
    return <Navigate to="/evaluate" replace />;
  }

  return <>{children}</>;
};

export default PublicRouteComponent;
