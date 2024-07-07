// ** Import Other
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
