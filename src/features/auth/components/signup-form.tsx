import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "../../../components";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupFormType } from "../types";
import { authService } from "../../../services/auth-service";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Subscription } from "rxjs";

export const SignupForm = () => {
  const [errorMsg, setError] = useState("");
  const [isLoading, setLoad] = useState(false);
  const navigate = useNavigate();
  const subscriptionRef = useRef<Subscription | null>();

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
      setLoad(true);
      subscriptionRef.current = authService.signup({ values }).subscribe({
        next: () => {
          setLoad(false);
          navigate("/");
        },
        error: (error) => {
          setError(error.message);
          setLoad(false);
        },
      });
    },

    [navigate]
  );
  useEffect(() => {
    return () => {
      if (subscriptionRef.current && !subscriptionRef.current.closed) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

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
              setErrorMsg={setError}
            />
            <InputField
              label="Email Address"
              type="email"
              name="email"
              setErrorMsg={setError}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              setErrorMsg={setError}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              setErrorMsg={setError}
            />
            <Stack textAlign={"center"}>
              <Typography>{errorMsg}</Typography>
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign up"}
              </Button>
              <Divider color={"primary"} />
              <Typography mt={2}>
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
