// Cart.jsx — rewritten by me with my own comments & structure (no functionality changed)

import {
  Button,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Box,
  Modal,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";

import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";


// ----------------------------
// Form Initial Values
// ----------------------------
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
  country: "",
};

// ----------------------------
// Form Validation Schema
// ----------------------------
const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^\d{5}$/, "Pincode must be 5 digits")
    .required("Pincode is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

// Common modal styling
const modalStyle = {
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

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);

  // For showing validation snackbars
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // For handling address modal
  const [openAddressModal, setOpenAddressModal] = useState(false);

  // ----------------------------
  // Fetch user cart on component mount
  // ----------------------------
  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  // Close modal
  const handleCloseAddressModal = () => setOpenAddressModal(false);

  // Submit handler for new address form
  const handleSubmit = (values) => {
    const payload = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: values.country,
        },
      },
    };

    // I only allow checkout when items belong to the same restaurant
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(payload));
    } else {
      setOpenSnackbar(true);
    }
  };

  // When user selects an existing saved address
  const createOrderUsingSelectedAddress = (address) => {
    const payload = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: address.streetAddress,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        },
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(payload));
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Fragment>
      {/* ------------------------------------
          If cart is NOT empty, show cart UI
        ------------------------------------ */}
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">

          {/* ------------------------------
              LEFT: Cart Item List + Bill
            ------------------------------ */}
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}

            <Divider />

            {/* Billing Section */}
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>

              <div className="space-y-3 text-gray-400">
                <div className="flex justify-between">
                  <p>Item Total</p>
                  <p>${cartTotal(cart.cartItems)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Delivery Charge</p>
                  <p>$8</p>
                </div>

                <div className="flex justify-between">
                  <p>Service Charge</p>
                  <p>$2</p>
                </div>

                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>$1</p>
                </div>

                <Divider />

                <div className="flex justify-between">
                  <p>Total Pay</p>
                  <p>${cartTotal(cart.cartItems) + 11}</p>
                </div>
              </div>
            </div>
          </section>

          <Divider orientation="vertical" flexItem />

          {/* ------------------------------
              RIGHT: Address Selection UI
            ------------------------------ */}
          <section className="lg:w-[70%] flex justify-center px-5 pb-10">
            <div>
              <h1 className="text-center font-semibold text-2xl py-10">
                Choose Delivery Address
              </h1>

              <div className="flex gap-5 flex-wrap justify-center">

                {/* Saved User Addresses */}
                {auth.user?.addresses?.map((addr, i) => (
                  <AddressCard
                    key={i}
                    item={addr}
                    showButton={true}
                    handleSelectAddress={createOrderUsingSelectedAddress}
                  />
                ))}

                {/* Add New Address Card */}
                <Card className="flex flex-col justify-center items-center p-5 w-64">
                  <div className="flex space-x-5">
                    <AddLocationAltIcon />
                    <div className="space-y-5">
                      <p>Add New Address</p>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setOpenAddressModal(true)}
                        sx={{ padding: ".75rem" }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          </section>
        </main>
      ) : (
        // ------------------------------------
        // EMPTY CART UI
        // ------------------------------------
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* ------------------------------
          Modal for adding new address
        ------------------------------ */}
      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={modalStyle}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                {/* Street Address */}
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    fullWidth
                    label="Street Address"
                    helperText={<ErrorMessage name="streetAddress" />}
                  />
                </Grid>

                {/* State + Pincode */}
                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    fullWidth
                    label="State"
                    helperText={<ErrorMessage name="state" />}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="pincode"
                    as={TextField}
                    fullWidth
                    label="Pincode"
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </Grid>

                {/* City */}
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    fullWidth
                    label="City"
                    helperText={<ErrorMessage name="city" />}
                  />
                </Grid>

                {/* Country Dropdown */}
                <Grid item xs={12}>
                  <Field
                    name="country"
                    as={TextField}
                    select
                    fullWidth
                    label="Country"
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="United Kingdom">
                      United Kingdom
                    </MenuItem>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-600"
                  />
                </Grid>

                {/* Submit */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      {/* Snackbar for validation warning */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Please add items only from one restaurant at a time"
      />
    </Fragment>
  );
};

export default Cart;
