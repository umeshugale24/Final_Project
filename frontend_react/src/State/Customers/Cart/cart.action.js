import { api } from "../../../config/api";
import {
  findCartFailure,
  findCartRequest,
  findCartSuccess,
  getAllCartItemsFailure,
  getAllCartItemsRequest,
  getAllCartItemsSuccess,
} from "./ActionCreators";

import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEARE_CART_FAILURE,
  CLEARE_CART_REQUEST,
  CLEARE_CART_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  UPDATE_CARTITEM_FAILURE,
  UPDATE_CARTITEM_REQUEST,
  UPDATE_CARTITEM_SUCCESS,
} from "./ActionTypes";

/**
 * Fetch user's cart details
 */
export const findCart = (token) => {
  return async (dispatch) => {
    dispatch(findCartRequest());

    try {
      const { data } = await api.get("/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(findCartSuccess(data));
    } catch (err) {
      dispatch(findCartFailure(err));
    }
  };
};

/**
 * Retrieve all items associated with a specific cart
 */
export const getAllCartItems = ({ cartId, token }) => {
  return async (dispatch) => {
    dispatch(getAllCartItemsRequest());

    try {
      const { data } = await api.get(`/api/carts/${cartId}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getAllCartItemsSuccess(data));
    } catch (err) {
      dispatch(getAllCartItemsFailure(err));
    }
  };
};

/**
 * Add an item to the user's cart
 */
export const addItemToCart = ({ cartItem, token }) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

    try {
      const { data } = await api.put("/api/cart/add", cartItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Item successfully added to cart:", data);
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    } catch (err) {
      console.log("Error adding item to cart:", err);
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: err.message });
    }
  };
};

/**
 * Modify an existing cart item (e.g., quantity)
 */
export const updateCartItem = ({ data: updatePayload, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });

    try {
      const { data } = await api.put("/api/cart-item/update", updatePayload, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Cart item updated:", data);
      dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
    } catch (err) {
      console.log("Error updating cart item:", err);
      dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: err.message });
    }
  };
};

/**
 * Remove an item from the cart entirely
 */
export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });

    try {
      await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Cart item removed:", cartItemId);
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (err) {
      console.log("Error removing cart item:", err);
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: err.message });
    }
  };
};

/**
 * Clear all items from the user’s cart
 */
export const clearCartAction = () => {
  return async (dispatch) => {
    dispatch({ type: CLEARE_CART_REQUEST });

    try {
      const jwt = localStorage.getItem("jwt");
      const { data } = await api.put(
        "/api/cart/clear",
        {},
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      console.log("Cart cleared:", data);
      dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
    } catch (err) {
      console.log("Error clearing cart:", err);
      dispatch({ type: CLEARE_CART_FAILURE, payload: err.message });
    }
  };
};
