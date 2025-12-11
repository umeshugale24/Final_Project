import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createIngredient } from "../../State/Admin/Ingredients/Action";

const CreateIngredientForm = ({ handleClose }) => {
  const { id } = useParams(); // restaurantId from URL (if needed)
  const dispatch = useDispatch();

  // Global store values
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwtToken = localStorage.getItem("jwt");

  // -----------------------------------------
  // Local State for input fields
  // -----------------------------------------
  const [inputValues, setInputValues] = useState({
    ingredientName: "",
    selectedCategory: ""
  });

  // -----------------------------------------
  // Update local state when input changes
  // -----------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // -----------------------------------------
  // Handle form submission
  // -----------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create payload to be sent to backend
    const payload = {
      name: inputValues.ingredientName,
      ingredientCategoryId: inputValues.selectedCategory,
      restaurantId: restaurant.usersRestaurant.id
    };

    // Dispatch create ingredient action
    dispatch(
      createIngredient({
        data: payload,
        jwt: auth.jwt || jwtToken
      })
    );

    // Reset form fields
    setInputValues({
      ingredientName: "",
      selectedCategory: ""
    });

    // Close modal
    handleClose();
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Add New Ingredient
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Ingredient Name Input */}
        <TextField
          label="Ingredient Name"
          name="ingredientName"
          fullWidth
          value={inputValues.ingredientName}
          onChange={handleChange}
        />

        {/* Ingredient Category Dropdown */}
        <FormControl fullWidth>
          <InputLabel id="ingredient-category-label">Category</InputLabel>

          <Select
            labelId="ingredient-category-label"
            id="ingredient-category"
            name="selectedCategory"
            label="Category"
            value={inputValues.selectedCategory}
            onChange={handleChange}
          >
            {ingredients.category.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Create Ingredient
        </Button>
      </form>
    </div>
  );
};

export default CreateIngredientForm;
