import { LoginFormType, SignupFormType, UserType } from "../features";

export type AuthContextType = {
  user: string;
  signup: ({ q, setErrorMsg, setLoading, values }: SignupProps) => void;
  login: ({ q, setErrorMsg, setLoading, values }: LoginProps) => void;
  logout: () => void;
};

export type SignupProps = {
  q: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  values: SignupFormType;
};

export type LoginProps = {
  q: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  values: LoginFormType;
};
