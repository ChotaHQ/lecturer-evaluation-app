import { useLocation } from "react-router-dom";
import CreatePasswordComponent from "../components/CreatePasswordComponent";

const CreatePasswordPage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const role = queryParams.get("role");

  return (
    <CreatePasswordComponent userId={userId as string} role={role as string} />
  );
};

export default CreatePasswordPage;
