import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected-routes";
import { publicRoutes } from "./public-routes";
import { useAuth } from "../hooks/auth-context";
import { LandingPage } from "../layouts";

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: "/", element: <LandingPage /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
