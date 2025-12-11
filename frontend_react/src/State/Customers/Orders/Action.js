import { api } from "../../../config/api";
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getUsersOrdersFailure,
  getUsersOrdersRequest,
  getUsersOrdersSuccess,
} from "./ActionCreators";

import {
  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_SUCCESS,
} from "./ActionTypes";

/**
 * Create a new order
 */
export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());

    try {
      const { data } = await api.post("/api/order", reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });

      // Redirect to payment gateway if URL is present
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

      console.log("Order created:", data);
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.error("Order creation failed:", error);
      dispatch(createOrderFailure(error));
    }
  };
};

/**
 * Fetch all orders of the logged-in user
 */
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());

    try {
      const { data } = await api.get("/api/order/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Fetched user orders:", data);
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      dispatch(getUsersOrdersFailure(error));
    }
  };
};

/**
 * Fetch notifications for logged-in user
 */
export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });

    try {
      const token = localStorage.getItem("jwt");

      const { data } = await api.get("/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_USERS_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      dispatch({
        type: GET_USERS_NOTIFICATION_FAILURE,
        payload: error,
      });
    }
  };
};
