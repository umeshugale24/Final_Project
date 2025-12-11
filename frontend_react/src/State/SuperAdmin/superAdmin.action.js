import { api } from "../../config/api";
import {
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_PENDING_CUSTOMERS_FAILURE,
  GET_PENDING_CUSTOMERS_REQUEST,
  GET_PENDING_CUSTOMERS_SUCCESS,
} from "./superAdmin.actionType";

// =====================================
// 🟦 Fetch All Customers
// =====================================
export const getCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CUSTOMERS_REQUEST });

    try {
      const token = localStorage.getItem("jwt");

      const { data } = await api.get("/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// =====================================
// 🟦 Fetch Pending Customer Approvals
// =====================================
export const getPendingCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PENDING_CUSTOMERS_REQUEST });

    try {
      const token = localStorage.getItem("jwt");

      const { data } = await api.get("/api/customers/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_PENDING_CUSTOMERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PENDING_CUSTOMERS_FAILURE,
        payload: error.message,
      });
    }
  };
};
