import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../../../State/Authentication/Action";

// Initial email field values for the reset request form
const initialValues = {
  email: "",
};

// Yup schema to ensure the user enters a valid email
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ResetPasswordRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  // When the user clicks submit, I simply pass the email to my Redux action
  const handleSubmit = (values) => {
    console.log("Reset password request initiated for:", values.email);
    dispatch(resetPasswordRequest(values.email));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* Title Section */}
        <div>
          <Typography className="text-center" variant="h5">
            Forgot Password
          </Typography>

          {/* Formik wrapper to manage form state + validation */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {/* Email input field */}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                id="email"
                autoComplete="email"
                helperText={<ErrorMessage name="email" />}
              />

              {/* Button triggers password reset request */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, padding: "1rem" }}
              >
                Send Reset Password Link
              </Button>
            </Form>
          </Formik>
        </div>
      </Container>

      {/* Loader shown while backend request is processing */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={auth.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ResetPasswordRequest;
