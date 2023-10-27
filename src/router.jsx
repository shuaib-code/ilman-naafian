import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./Root";
import DeviceCheck from "./DeviceCheck/DeviceCheck";
import Read from "./pages/Read";
import PrivateRoute from "./Auth/PrivateRoute";
import Wishlist from "./pages/Wishlist";
import AdminRoute from "./Auth/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DeviceCheck>
        <Root></Root>
      </DeviceCheck>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/read",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Read></Read>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Wishlist></Wishlist>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
