import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../State/Admin/Ingredients/Action";

/**
 * Component for creating a new Ingredient Category
 * Used inside admin dashboard (restaurant owner)
 */
const CreateIngredientCategoryForm = ({ handleClose }) => {
  // Extract restaurant ID from URL if needed
  const { id } = useParams();

  const dispatch = useDispatch();

  // Global states
  const { auth, restaurant } = useSelector((store) => store);
  const token = localStorage.getItem("jwt");

  // Local form state (renamed for uniqueness)
  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });

  /**
   * Updates field values in local state
   */
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setCategoryInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles category creation submit
   */
  const handleCreateCategory = (event) => {
    event.preventDefault();

    // Prepare request body
    const payload = {
      name: categoryInput.name,
      restaurantId: restaurant.usersRestaurant.id, // already available in global store
    };

    // Dispatch create action
    dispatch(
      createIngredientCategory({
        data: payload,
        jwt: auth.jwt || token,
      })
    );

    // Reset form input
    setCategoryInput({ name: "" });

    // Close modal
    handleClose();
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>

        {/* FORM */}
        <form onSubmit={handleCreateCategory} className="space-y-5">

          {/* Category Name Input */}
          <TextField
            label="Category Name"
            fullWidth
            name="name"
            value={categoryInput.name}
            onChange={handleFieldChange}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
