import { createContext } from "react";
import { NewUserType, UserContextType, UserType } from "../types";
import { useAbortController } from "./abort-controller";
import axios from "axios";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
const API = "http://localhost:5000/users";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const config = useAbortController();

  const getUserData = async (q = "") => {
    try {
      const res = await axios.get(`${API}${q}`, config);
      const data: UserType[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const postUserData = async (user: NewUserType) => {
    try {
      const res = await axios.post(`${API}`, user, config);
      const data: UserType = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider value={{ getUserData, postUserData }}>
      {children}
    </UserContext.Provider>
  );
};
