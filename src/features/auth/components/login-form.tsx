import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputField } from "../../../components";
import * as Yup from "yup";
import { LoginFormType } from "..";
import { authService } from "../../../services/auth-service";
import { Stack, Button, Divider, Typography } from "@mui/material";
import { Subscription } from "rxjs";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const subscriptionRef = useRef<Subscription | null>();

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
    (values: LoginFormType) => {
      setLoading(true);
      subscriptionRef.current = authService
        .login({
          values: values,
        })
        .subscribe({
          next: () => {
            navigate("/");
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
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
    >
      {() => {
        return (
          <Form noValidate>
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

            <Stack textAlign={"center"}>
              <Typography>{errorMsg}</Typography>
              <Button variant="contained" type="submit">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
              <Divider color={"primary"} />
              <Typography mt={2}>
                Not a member? <Link to="/signup">Register</Link>
              </Typography>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
