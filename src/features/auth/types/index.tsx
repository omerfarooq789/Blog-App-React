export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};
export type NewUserType = {
  username: string;
  email: string;
  password: string;
};

export type layoutProp = {
  title: string;
  children: React.ReactNode;
};

export type SignupFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type UserContextType = {
  getUserData: (q?: string) => Promise<UserType[] | undefined>;
  postUserData: (user: NewUserType) => Promise<UserType | undefined>;
};
