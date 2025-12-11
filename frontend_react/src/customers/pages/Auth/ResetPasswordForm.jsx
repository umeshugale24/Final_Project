import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../State/Authentication/Action";

// Validation rules – I'm enforcing minimum security standards for the new password
const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters") // basic safety rule
    .required("Password is required"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // user must not mistype it
    .required("Confirmed password is required"),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // I extract the reset token from URL params so backend can validate the request
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  // Form initial state
  const initialValues = {
    password: "",
    confirmedPassword: "",
  };

  // This is where I submit the final password reset request
  const handleSubmit = (values, { setSubmitting }) => {
    // Logging for debugging while developing
    console.log("Reset password payload:", values);

    // Data structure backend expects
    const data = {
      password: values.password,
      token,
    };

    // Trigger redux action to call backend API
    dispatch(resetPassword({ navigate, data }));

    // Stop loader in Formik
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-5">
        <div className="space-y-5">

          {/* Password Input – using MUI TextField through Formik's Field wrapper */}
          <div>
            <Field
              as={TextField}
              type="password"
              placeholder="Password"
              name="password"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Confirm Password – must match the first one */}
          <div>
            <Field
              as={TextField}
              type="password"
              placeholder="Confirm Password"
              name="confirmedPassword"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="confirmedPassword"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        {/* Submission button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ padding: ".8rem 0rem" }}
        >
          Reset Password
        </Button>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
