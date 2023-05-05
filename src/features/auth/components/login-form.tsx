import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { InputField } from "../../../components";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/auth-context";
import { LoginFormType } from "..";

export const LoginForm = () => {
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };
  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string().required("Required!"),
      password: Yup.string().required("Required!"),
    });
  }, []);
  const onSubmit = useCallback(
    async (values: LoginFormType) => {
      const q = `?email=${values.email}`;
      auth.login({
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
    >
      {() => {
        return (
          <Form noValidate>
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

            <div className="text-center">
              <div className="error mb-3">{errorMsg}</div>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                {isLoading ? "Loading..." : "Sign in"}
              </button>
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
