import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../State/Authentication/Action";

// ----------------------------------------------
// Initial values for login fields
// Keeping them separate makes the form easy to reset
// ----------------------------------------------
const defaultLoginValues = {
  email: "",
  password: "",
};

// ----------------------------------------------
// Yup validation schema
// I prefer Yup for clean validation rules
// ----------------------------------------------
const loginValidationRules = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ----------------------------------------------
  // This function runs when the user submits the login form
  // I keep it lean because Formik already gives clean values
  // ----------------------------------------------
  const handleLoginSubmit = (formValues) => {
    console.log("Logging in with user data:", formValues);

    // Dispatching Redux login action
    dispatch(loginUser({ data: formValues, navigate }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>

        {/* --------------------------------------
           Formik wrapper → handles form state, errors & submission
           -------------------------------------- */}
        <Formik
          initialValues={defaultLoginValues}
          validationSchema={loginValidationRules}
          onSubmit={handleLoginSubmit}
        >
          <Form>
            {/* Email field */}
            <Field
              as={TextField}
              label="Email Address"
              name="email"
              id="email"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="email" />}
            />

            {/* Password field */}
            <Field
              as={TextField}
              label="Password"
              name="password"
              id="password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="password" />}
            />

            {/* Login button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, padding: "1rem" }}
            >
              Login
            </Button>
          </Form>
        </Formik>

        {/* Navigation to Register Page */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Button onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginForm;
