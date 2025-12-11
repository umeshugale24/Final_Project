import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  OutlinedInput,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { createMenuItem } from "../../State/Customers/Menu/menu.action";

/* ---------------------------
   Select dropdown UI settings
--------------------------- */
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

/* ---------------------------
     Form validation schema
--------------------------- */
const validationSchema = Yup.object({
  name: Yup.string().required("Food name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be 0 or more"),
  imageUrl: Yup.string().url("Invalid URL"),
  vegetarian: Yup.boolean().required(),
  seasonal: Yup.boolean().required(),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(0, "Quantity must be 0 or more"),
});

/* ---------------------------
   Initial Form Values
--------------------------- */
const emptyFormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  vegetarian: true,
  seasonal: false,
  quantity: 0,
  ingredients: [],
};

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { restaurant, ingredients, auth, menu } = useSelector(
    (store) => store
  );

  const [isUploadingImg, setUploadingImg] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const jwt = localStorage.getItem("jwt");

  /* ---------------------------
        Formik Setup
  --------------------------- */
  const formik = useFormik({
    initialValues: emptyFormState,
    validationSchema,
    onSubmit: (values) => {
      // Attach the restaurantId before sending
      const menuPayload = {
        ...values,
        restaurantId: restaurant.usersRestaurant?.id,
      };

      dispatch(createMenuItem({ menu: menuPayload, jwt: auth.jwt || jwt }));
      console.log("Final menu values →", menuPayload);
    },
  });

  /* ---------------------------
        Upload Image Handler
  --------------------------- */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImg(true);
    const uploadedUrl = await uploadToCloudinary(file);
    setUploadingImg(false);

    // Push uploaded image URL to array
    formik.setFieldValue("images", [
      ...formik.values.images,
      uploadedUrl,
    ]);
  };

  /* ---------------------------
        Remove Image Handler
  --------------------------- */
  const removeSelectedImage = (imageIndex) => {
    const updatedList = [...formik.values.images];
    updatedList.splice(imageIndex, 1);
    formik.setFieldValue("images", updatedList);
  };

  /* ---------------------------
        Snackbar Handler
  --------------------------- */
  useEffect(() => {
    if (menu.message || menu.error) {
      setIsSnackbarOpen(true);
    }
  }, [menu.message, menu.error]);

  const closeSnackbar = () => setIsSnackbarOpen(false);

  return (
    <>
      {/* Main container */}
      <div className="lg:px-32 px-5 lg:flex justify-center min-h-screen items-center pb-5">
        <div>
          <h1 className="font-bold text-2xl text-center py-2">
            Add New Menu Item
          </h1>

          {/* ---------------------------
                Form Start
          --------------------------- */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">

            <Grid container spacing={2}>

              {/* ---------------------------
                     Image Upload Section
              --------------------------- */}
              <Grid item xs={12} className="flex flex-wrap gap-5">

                <input
                  type="file"
                  accept="image/*"
                  id="menuImageInput"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <label htmlFor="menuImageInput" className="relative">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                    <AddPhotoAlternateIcon className="text-white" />
                  </span>

                  {/* Loading spinner */}
                  {isUploadingImg && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                {/* Preview thumbnails */}
                <div className="flex flex-wrap gap-2">
                  {formik.values.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt="Menu"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <IconButton
                        onClick={() => removeSelectedImage(index)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </Grid>

              {/* ---------------------------
                    Name Field
              --------------------------- */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Food Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* ---------------------------
                    Description Field
              --------------------------- */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* ---------------------------
                    Price Field
              --------------------------- */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* ---------------------------
                Category Dropdown
              --------------------------- */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  >
                    {restaurant.categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* ---------------------------
                Ingredients Multi-Select
              --------------------------- */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Ingredients</InputLabel>
                  <Select
                    multiple
                    name="ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Ingredients" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((item) => (
                          <Chip key={item.id} label={item.name} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MENU_PROPS}
                  >
                    {ingredients.ingredients?.map((ing) => (
                      <MenuItem key={ing.id} value={ing}>
                        {ing.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* ---------------------------
                Vegetarian / Seasonal
              --------------------------- */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Vegetarian</InputLabel>
                  <Select
                    name="vegetarian"
                    label="Vegetarian"
                    value={formik.values.vegetarian}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Seasonal</InputLabel>
                  <Select
                    name="seasonal"
                    label="Seasonal"
                    value={formik.values.seasonal}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit">
              Create Menu Item
            </Button>
          </form>
        </div>
      </div>

      {/* Snackbar popup */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={menu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {menu.message || menu.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMenuForm;
