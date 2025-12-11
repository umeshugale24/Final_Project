import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // ✅ Validation library
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton, Modal } from "@mui/material";
import { createRestaurant } from "../../State/Customers/Restaurant/restaurant.action";

/* --------------------------------------------------
   Auto-Saved Local Storage Key
--------------------------------------------------- */
const STORAGE_KEY = "restaurant_form_backup";

/* --------------------------------------------------
   Yup Validation Schema
--------------------------------------------------- */
const validationSchema = Yup.object({
  name: Yup.string().required("Restaurant name is required"),
  description: Yup.string().required("Description is required"),

  cuisineType: Yup.string().required("Cuisine type is required"),

  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  stateProvince: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),

  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),

  twitter: Yup.string(),
  instagram: Yup.string(),
});

/* --------------------------------------------------
   Initial Default Values
--------------------------------------------------- */
const defaultValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
  images: [],
};

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewImage, setPreviewImage] = useState(null); // Preview modal image

  /* --------------------------------------------------
     Load Backup Data From Local Storage
  --------------------------------------------------- */
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultValues;

  /* --------------------------------------------------
     Formik Setup
  --------------------------------------------------- */
  const formik = useFormik({
    initialValues: savedForm,
    validationSchema,
    enableReinitialize: true, // reload when saved data changes
    onSubmit: async (values) => {
      setIsSubmitting(true);

      const formattedData = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };

      const response = await dispatch(createRestaurant({ data: formattedData, token }));

      setIsSubmitting(false);

      if (response?.type?.includes("fulfilled")) {
        localStorage.removeItem(STORAGE_KEY); // clear saved data
      }
    },
  });

  /* --------------------------------------------------
     Auto-Save Form to LocalStorage
  --------------------------------------------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formik.values));
  }, [formik.values]);

  /* --------------------------------------------------
     Handle Image Upload
  --------------------------------------------------- */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    const uploadedImage = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, uploadedImage]);
    setIsUploadingImage(false);
  };

  /* --------------------------------------------------
     Remove Uploaded Image
  --------------------------------------------------- */
  const handleRemoveImage = (index) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">

        <h1 className="font-bold text-3xl text-center py-3">Add New Restaurant</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>

            {/* -----------------------------------------
               Image Uploader
            ------------------------------------------ */}
            <Grid item xs={12} className="flex flex-wrap gap-5">
              <input
                type="file"
                accept="image/*"
                id="imageUploader"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              <label htmlFor="imageUploader" className="relative">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600 bg-gray-900">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>

                {isUploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CircularProgress size={35} />
                  </div>
                )}
              </label>

              {/* Display uploaded images */}
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((img, index) => (
                  <div key={index} className="relative">

                    <img
                      src={img}
                      alt="uploaded"
                      className="w-24 h-24 object-cover rounded cursor-pointer"
                      onClick={() => setPreviewImage(img)} // Open preview modal
                    />

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{ position: "absolute", top: 0, right: 0, background: "white" }}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            {/* -----------------------------------------
               Restaurant Fields
            ------------------------------------------ */}

            {[
              { id: "name", label: "Restaurant Name" },
              { id: "description", label: "Description" },
              { id: "cuisineType", label: "Cuisine Type" },
              { id: "openingHours", label: "Opening Hours" },
              { id: "streetAddress", label: "Street Address" },
              { id: "city", label: "City" },
              { id: "stateProvince", label: "State / Province" },
              { id: "postalCode", label: "Postal Code" },
              { id: "country", label: "Country" },
              { id: "email", label: "Email" },
              { id: "mobile", label: "Mobile Number" },
              { id: "twitter", label: "Twitter" },
              { id: "instagram", label: "Instagram" },
            ].map((field) => (
              <Grid item xs={field.id === "description" ? 12 : 6} key={field.id}>
                <TextField
                  fullWidth
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched[field.id] && formik.errors[field.id])}
                  helperText={formik.touched[field.id] && formik.errors[field.id]}
                />
              </Grid>
            ))}

          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Create Restaurant"}
          </Button>
        </form>
      </div>

      {/* ---------------------------------------
         Image Preview Modal
      ---------------------------------------- */}
      <Modal open={!!previewImage} onClose={() => setPreviewImage(null)}>
        <div className="flex items-center justify-center h-full">
          <img src={previewImage} className="max-w-xl rounded shadow-lg" />
        </div>
      </Modal>
    </div>
  );
};

export default CreateRestaurantForm;
