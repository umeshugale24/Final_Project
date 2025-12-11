// action.js
import { api } from "../../../config/api";
import {
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  UPDATE_STOCK,
} from "./ActionType";

// -------------------------------
// Fetch Ingredients of a Restaurant
// -------------------------------
export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Ingredients fetched:", data);

      dispatch({
        type: GET_INGREDIENTS,
        payload: data,
      });
    } catch (error) {
      console.log("Error fetching ingredients:", error);
    }
  };
};

// -------------------------------
// Create a New Ingredient
// -------------------------------
export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Ingredient created:", response.data);

      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error creating ingredient:", error);
    }
  };
};

// -------------------------------
// Create Ingredient Category
// -------------------------------
export const createIngredientCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Ingredient category created:", response.data);

      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error creating ingredient category:", error);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
      });
    }
  };
};

// -------------------------------
// Fetch Ingredient Categories
// -------------------------------
export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${id}/category`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("Fetched ingredient categories:", data);

      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Error fetching ingredient categories:", error);
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE });
    }
  };
};

// -------------------------------
// Update Ingredient Stock
// -------------------------------
export const updateStockOfIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${id}/stoke`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("Stock updated:", data);

      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
    } catch (error) {
      console.log("Error updating ingredient stock:", error);
    }
  };
};
