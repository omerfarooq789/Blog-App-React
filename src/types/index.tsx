import { LoginFormType, SignupFormType, UserType } from "../features";

export type AuthContextType = {
  user: string;
  signup: ({ values }: SignupProps) => void;
  login: ({ values }: LoginProps) => void;
  logout: () => void;
};

export type SignupProps = {
  values: SignupFormType;
};

export type LoginProps = {
  values: LoginFormType;
};
