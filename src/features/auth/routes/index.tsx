import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./login";
import { Signup } from "./signup";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
