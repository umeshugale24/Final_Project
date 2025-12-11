// actions.js
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionType.js";
import { api } from "../../../config/api.js";

// ------------------ Update Order Status ------------------
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

    try {
      const { data } = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("Updated order:", data);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Update order error:", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
    }
  };
};

// ------------------ Get All Orders of Restaurant ------------------
export const fetchRestaurantsOrder = ({
  restaurantId,
  orderStatus,
  jwt,
}) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

    try {
      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("Restaurant Orders:", data);

      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Fetch restaurant orders error:", error);
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
    }
  };
};
