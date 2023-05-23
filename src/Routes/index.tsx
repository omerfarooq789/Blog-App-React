import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected-routes";
import { publicRoutes } from "./public-routes";
import { LandingPage } from "../layouts";
import { authService } from "../services/auth-service";
import { useObservable } from "rxjs-hooks";
import { map } from "rxjs";

export const AppRoutes = () => {
  let isAuthorized = false;
  isAuthorized = useObservable(
    () =>
      authService.currentUser$.pipe(
        map((res) => {
          return !!res;
        })
      ),
    isAuthorized
  );

  const commonRoutes = [{ path: "/", element: <LandingPage /> }];

  const routes = isAuthorized ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
