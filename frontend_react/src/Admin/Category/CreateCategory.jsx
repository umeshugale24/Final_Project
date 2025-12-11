import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Customers/Restaurant/restaurant.action";

const CreateCategory = ({ handleClose }) => {
  const { id: restaurantId } = useParams(); // restaurant ID from URL
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const jwt = auth.jwt || localStorage.getItem("jwt");

  // Local form state
  const [formValues, setFormValues] = useState({
    categoryName: "",
  });

  // Update state when user types
  const updateField = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // Handle category creation
  const submitCategoryForm = (event) => {
    event.preventDefault();

    const payload = {
      name: formValues.categoryName,
      restaurant: { id: restaurantId },
    };

    // Dispatch Redux action
    dispatch(
      createCategoryAction({
        reqData: payload,
        jwt,
      })
    );

    // Reset form
    setFormValues({ categoryName: "" });

    // Close modal
    handleClose();
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Create New Category
      </h1>

      <form className="space-y-5" onSubmit={submitCategoryForm}>
        <TextField
          label="Category Name"
          name="categoryName"
          value={formValues.categoryName}
          onChange={updateField}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
