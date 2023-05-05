import { Navigate } from "react-router-dom";
import { NoMatch } from "../layouts";
import { BlogRoutes } from "../features";

export const protectedRoutes = [
  {
    path: "/*",
    element: <BlogRoutes />,
  },

  { path: "/", element: <Navigate to="/my_post" /> },
  { path: "/login", element: <Navigate to="/" /> },
  { path: "/signup", element: <Navigate to="/" /> },
  { path: "*", element: <NoMatch /> },
];
