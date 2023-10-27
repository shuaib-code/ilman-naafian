import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }
  return user ? (
    children
  ) : (
    <>
      <Navigate to="/"></Navigate>
      {toast.error("Login first")}
    </>
  );
};

export default PrivateRoute;
