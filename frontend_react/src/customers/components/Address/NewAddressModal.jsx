import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// 👉 Initial empty values for the address form.
//    I defined all fields that I want the user to input.
const defaultAddressValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
  country: ""
};

// 👉 Validation rules. I want to make sure the user enters proper data.
//    Using Yup because it keeps the schema clean.
const addressValidationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{5}$/, "Pincode must be 5 digits"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

// 👉 Styling for the modal. I am keeping it centered and clean.
const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const NewAddress = ({ open, handleClose }) => {
  const location = useLocation();

  // 👉 When the form submits, I currently just log values.
  //    Later, I can plug this into backend APIs.
  const handleFormSubmit = (values, { resetForm }) => {
    console.log("Submitted:", values);
    resetForm(); // Clear form after use
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyle}>
        {/* 
          👉 I love using Formik because it simplifies form handling,
             especially with validation and state management.
        */}
        <Formik
          initialValues={defaultAddressValues}
          validationSchema={addressValidationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              
              {/* Street Address */}
              <Grid item xs={12}>
                <Field
                  name="streetAddress"
                  as={TextField}
                  label="Street Address"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="streetAddress">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>

              {/* State Input */}
              <Grid item xs={6}>
                <Field
                  name="state"
                  as={TextField}
                  label="State"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="state">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>

              {/* Pincode */}
              <Grid item xs={6}>
                <Field
                  name="pincode"
                  as={TextField}
                  label="Pincode"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="pincode">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>

              {/* City */}
              <Grid item xs={12}>
                <Field
                  name="city"
                  as={TextField}
                  label="City"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="city">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>

              {/* Country */}
              <Grid item xs={12}>
                <Field
                  name="country"
                  as={TextField}
                  label="Country"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="country">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Deliver Here
                </Button>
              </Grid>

            </Grid>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default NewAddress;
