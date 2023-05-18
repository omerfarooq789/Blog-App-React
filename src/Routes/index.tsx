import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected-routes";
import { publicRoutes } from "./public-routes";
import { LandingPage } from "../layouts";
import { authService } from "../services/auth-service";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <LandingPage /> }];

  const routes = authService.isAuthenticated ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
