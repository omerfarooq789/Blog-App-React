import { useState, createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAbortController } from "../features";
import { AuthContextType, LoginProps, SignupProps } from "../types";
// import axios from "axios";

// const API = "http://localhost:5000/users";
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const config = useAbortController();

  let session = localStorage.getItem("user");
  if (!session) {
    session = "";
  }
  const [user, setUser] = useState(session);
  // const navigate = useNavigate();

  // const getUserData = async (q = "") => {
  //   try {
  //     const res = await axios.get(`${API}${q}`, config);
  //     const data: UserType[] = res.data;
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const postUserData = async (user: NewUserType) => {
  //   try {
  //     const res = await axios.post(`${API}`, user, config);
  //     const data: UserType = res.data;
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const signup = async ({ values }: SignupProps) => {
    // const q = `?email=${values.email}`;
    // const emailCheck = await getUserData(q);
    // if (emailCheck) {
    //   if (emailCheck.length !== 0) {
    //     setErrorMsg("Email already Exist");
    //   } else {
    //     setErrorMsg("");
    //     setLoading(true);
    //     const newData = {
    //       username: values.username,
    //       email: values.email,
    //       password: values.password,
    //     };
    //     const newUser = await postUserData(newData);
    //     if (newUser) {
    //       setUser(JSON.stringify(newUser));
    //       localStorage.setItem("user", JSON.stringify(newUser));
    //       navigate("/");
    //     }
    //   }
    // }
  };
  const login = async ({ values }: LoginProps) => {
    // setLoading(true);
    // const q = `?email=${values.email}`;
    // const emailCheck = await getUserData(q);
    // if (emailCheck) {
    //   const userData: UserType = emailCheck[0];
    //   setLoading(false);
    //   if (userData) {
    //     setErrorMsg("");
    //     if (userData.password === values.password) {
    //       setUser(JSON.stringify(userData));
    //       localStorage.setItem("user", JSON.stringify(userData));
    //       navigate("/");
    //     } else {
    //       setErrorMsg("Email or Password is Invalid");
    //     }
    //   } else {
    //     setErrorMsg("Email or Password is Invalid");
    //   }
    // }
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
