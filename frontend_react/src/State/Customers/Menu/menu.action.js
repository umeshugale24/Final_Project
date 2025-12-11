import { api } from "../../../config/api";

import {
  createMenuItemFailure,
  createMenuItemRequest,
  createMenuItemSuccess,
  deleteMenuItemFailure,
  deleteMenuItemRequest,
  deleteMenuItemSuccess,
  getMenuItemsByRestaurantIdFailure,
  getMenuItemsByRestaurantIdRequest,
  getMenuItemsByRestaurantIdSuccess,
} from "./ActionCreators";

import {
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// ---------------------------------------------
// Create New Menu Item
// ---------------------------------------------
export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch(createMenuItemRequest());

    try {
      const { data } = await api.post(
        `/api/admin/food`,
        menu,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      console.log("Menu Created:", data);
      dispatch(createMenuItemSuccess(data));
    } catch (error) {
      console.error("Menu creation failed:", error);
      dispatch(createMenuItemFailure(error));
    }
  };
};

// ---------------------------------------------
// Get Menu Items of a Restaurant
// ---------------------------------------------
export const getMenuItemsByRestaurantId = (params) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByRestaurantIdRequest());

    try {
      const { data } = await api.get(
        `/api/food/restaurant/${params.restaurantId}?vegetarian=${params.vegetarian}&nonveg=${params.nonveg}&seasonal=${params.seasonal}&food_category=${params.foodCategory}`,
        {
          headers: { Authorization: `Bearer ${params.jwt}` }
        }
      );

      console.log("Fetched Menu List:", data);
      dispatch(getMenuItemsByRestaurantIdSuccess(data));
    } catch (error) {
      console.error("Fetching menu failed:", error);
      dispatch(getMenuItemsByRestaurantIdFailure(error));
    }
  };
};

// ---------------------------------------------
// Search Menu Item
// ---------------------------------------------
export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

    try {
      const { data } = await api.get(
        `/api/food/search?name=${keyword}`,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      console.log("Search Results:", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.error("Search error:", error);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

// ---------------------------------------------
// Get All Food Items of Restaurant (All Ingredients Included)
// ---------------------------------------------
export const getAllIngredientsOfMenuItem = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByRestaurantIdRequest());

    try {
      const { data } = await api.get(
        `/api/food/restaurant/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      console.log("Menu Items with Ingredients:", data);
      dispatch(getMenuItemsByRestaurantIdSuccess(data));
    } catch (error) {
      console.error("Fetching ingredients failed:", error);
      dispatch(getMenuItemsByRestaurantIdFailure(error));
    }
  };
};

// ---------------------------------------------
// Update Food Availability Status
// ---------------------------------------------
export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });

    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      console.log("Availability Updated:", data);
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.error("Availability update error:", error);
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error
      });
    }
  };
};

// ---------------------------------------------
// Delete Food Item
// ---------------------------------------------
export const deleteFoodAction = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });

    try {
      await api.delete(`/api/admin/food/${foodId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });

      console.log("Deleted Food:", foodId);
      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: foodId
      });
    } catch (error) {
      console.error("Delete failed:", error);
      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error
      });
    }
  };
};
