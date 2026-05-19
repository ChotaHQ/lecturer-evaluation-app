import AdminDashboardComponent from "../components/AdminDashboardComponent";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminDashboardPage = () => {
  const { user } = useAuthContext();

  return <AdminDashboardComponent adminEmail={user?.emailAddress} />;
};

export default AdminDashboardPage;
