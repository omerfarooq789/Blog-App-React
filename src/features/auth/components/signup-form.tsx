import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "../../../components";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../hooks/auth-context";
import { Link } from "react-router-dom";
import { SignupFormType } from "../types";

export const SignupForm = () => {
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const initialValues: SignupFormType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = useMemo(() => {
    return Yup.object({
      username: Yup.string()
        .min(3, "Username Must be more than 3 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .matches(/[A-Z]+/, "Password Must have one Capital Letter")
        .matches(/\d+/, "Password Must have one Number")
        .matches(/[!@#$%^&*]+/, "Password Must have one Special Character")
        .min(8)
        .max(15)
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password Doesn't Match")
        .required("Required!"),
    });
  }, []);
  const onSubmit = useCallback(
    (values: SignupFormType) => {
      const q = `?email=${values.email}`;
      auth.signup({
        q: q,
        setErrorMsg: setErrorMsg,
        setLoading: setLoading,
        values: values,
      });
    },
    [auth]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {() => {
        return (
          <Form>
            <InputField
              label="User Name"
              type="text"
              name="username"
              setErrorMsg={setErrorMsg}
            />
            <InputField
              label="Email Address"
              type="email"
              name="email"
              setErrorMsg={setErrorMsg}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              setErrorMsg={setErrorMsg}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              setErrorMsg={setErrorMsg}
            />
            <div className="text-center">
              <div className="error mb-3">{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-3"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign up"}
              </button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
