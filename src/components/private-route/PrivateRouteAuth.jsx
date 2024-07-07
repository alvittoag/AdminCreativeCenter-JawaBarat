// ** Import Other
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAuth = () => {
  const admin = localStorage.getItem("admin");

  if (admin) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouteAuth;
