// In my UI I need a registration form, so I'm importing Formik for controlled forms,
// Yup for validation, and MUI components to keep the UI consistent.
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
} from "@mui/material";

// I also need navigation after successful registration
import { useNavigate } from "react-router-dom";

// Redux dispatch to trigger backend/API registration
import { useDispatch } from "react-redux";
import { registerUser } from "../../../State/Authentication/Action";

// -------------------------
// Default form values
// -------------------------
const defaultFormValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER", // Keeping customer as default
};

// -------------------------
// Yup schema for validation
// -------------------------
const formValidationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: Yup.string().required("Role selection is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This is fired when user clicks "Register"
  const handleFormSubmit = (values) => {
    console.log("Submitting registration data:", values);

    // I'm dispatching a Redux action that hits backend and creates a new user
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div>
        {/* Form Title */}
        <Typography className="text-center" variant="h5">
          Register
        </Typography>

        {/* Using Formik so I don't manually manage form state */}
        <Formik
          initialValues={defaultFormValues}
          validationSchema={formValidationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            {/* Full Name Field */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              label="Full Name"
              name="fullName"
              id="fullName"
              variant="outlined"
              helperText={<ErrorMessage name="fullName" />}
            />

            {/* Email Field */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              id="email"
              variant="outlined"
              helperText={<ErrorMessage name="email" />}
            />

            {/* Password Field */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              helperText={<ErrorMessage name="password" />}
            />

            {/* User Role Dropdown */}
            <Field
              as={Select}
              fullWidth
              name="role"
              id="role"
              variant="outlined"
              displayEmpty
              className="mt-3"
              helperText={<ErrorMessage name="role" />}
            >
              <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Form>
        </Formik>

        {/* Redirect to Login */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/account/login")}>Login</Button>
        </Typography>
      </div>
    </Container>
  );
};

export default RegistrationForm;
