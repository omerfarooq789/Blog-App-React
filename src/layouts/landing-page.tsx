import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth-context";
import { UserType } from "../features";

export const LandingPage = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      const userData: UserType = JSON.parse(auth.user);
      setUser(userData.username);
    } else {
      setUser("Sign in To Continue");
    }
  }, [auth.user]);

  return (
    <>
      <h1 className="text-center text-primary landing l-font">
        WELCOME TO MY BLOG APP
      </h1>
      <h1 className="text-center text-primary mt-5 l-font">
        {user.toUpperCase()}
      </h1>
    </>
  );
};
