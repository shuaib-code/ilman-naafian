import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (
    user?.email === "shuaib.cyclist@gmail.com" ||
    user?.email === "tasinoutlook@gmail.com"
  ) {
    return children;
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <h1 className="text-lg font-medium">
            You do not have access to this page
          </h1>
          <div className="flex justify-center items-center mt-3">
            <Link
              to="/"
              className="font-medium text-green bg-green px-3 py-1 rounded-sm bg-opacity-10"
            >
              Go back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminRoute;
