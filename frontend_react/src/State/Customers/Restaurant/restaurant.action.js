// Restaurant Actions

import { api } from "../../../config/api";
import {
  createRestaurantFailure,
  createRestaurantRequest,
  createRestaurantSuccess,
  deleteRestaurantFailure,
  deleteRestaurantRequest,
  deleteRestaurantSuccess,
  getAllRestaurantsFailure,
  getAllRestaurantsRequest,
  getAllRestaurantsSuccess,
  getRestaurantByIdFailure,
  getRestaurantByIdRequest,
  getRestaurantByIdSuccess,
  updateRestaurantFailure,
  updateRestaurantRequest,
  updateRestaurantSuccess,
} from "./ActionCreateros";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_RESTAIRANTS_EVENTS_FAILURE,
  GET_RESTAIRANTS_EVENTS_REQUEST,
  GET_RESTAIRANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionTypes";

// ========================================
// ✔ Fetch All Restaurants
// ========================================
export const getAllRestaurantsAction = (token) => async (dispatch) => {
  dispatch(getAllRestaurantsRequest());
  try {
    const { data } = await api.get("/api/restaurants", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(getAllRestaurantsSuccess(data));
    console.log("Fetched restaurants:", data);
  } catch (err) {
    dispatch(getAllRestaurantsFailure(err));
  }
};

// ========================================
// ✔ Fetch Restaurant by ID
// ========================================
export const getRestaurantById = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch(getRestaurantByIdRequest());
  try {
    const { data } = await api.get(`/api/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch(getRestaurantByIdSuccess(data));
  } catch (err) {
    console.log("Error fetching restaurant:", err);
    dispatch(getRestaurantByIdFailure(err));
  }
};

// ========================================
// ✔ Fetch Restaurant by Logged-in User
// ========================================
export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/admin/restaurants/user`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload: err.message,
    });
  }
};

// ========================================
// ✔ Create Restaurant
// ========================================
export const createRestaurant = ({ data, token }) => async (dispatch) => {
  dispatch(createRestaurantRequest());

  try {
    const response = await api.post("/api/admin/restaurants", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(createRestaurantSuccess(response.data));
    console.log("Restaurant created:", response.data);
  } catch (err) {
    dispatch(createRestaurantFailure(err));
  }
};

// ========================================
// ✔ Update Restaurant
// ========================================
export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
  dispatch(updateRestaurantRequest());

  try {
    const response = await api.put(`/api/admin/restaurant/${restaurantId}`, restaurantData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch(updateRestaurantSuccess(response.data));
  } catch (err) {
    dispatch(updateRestaurantFailure(err));
  }
};

// ========================================
// ✔ Delete Restaurant
// ========================================
export const deleteRestaurant = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch(deleteRestaurantRequest());

  try {
    await api.delete(`/api/admin/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch(deleteRestaurantSuccess(restaurantId));
  } catch (err) {
    dispatch(deleteRestaurantFailure(err));
  }
};

// ========================================
// ✔ Update Restaurant Status (Open/Closed)
// ========================================
export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

  try {
    const response = await api.put(
      `/api/admin/restaurants/${restaurantId}/status`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    dispatch({
      type: UPDATE_RESTAURANT_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_RESTAURANT_STATUS_FAILURE,
      payload: err,
    });
  }
};

// ========================================
// ✔ Create Event
// ========================================
export const createEventAction = ({ data, jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: CREATE_EVENTS_REQUEST });

  try {
    const response = await api.post(
      `/api/admin/events/restaurant/${restaurantId}`,
      data,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: CREATE_EVENTS_FAILURE, payload: err });
  }
};

// ========================================
// ✔ Get All Events
// ========================================
export const getAllEvents = ({ jwt }) => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_REQUEST });

  try {
    const response = await api.get(`/api/events`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: err });
  }
};

// ========================================
// ✔ Delete Event
// ========================================
export const deleteEventAction = ({ eventId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_EVENTS_REQUEST });

  try {
    await api.delete(`/api/admin/events/${eventId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
  } catch (err) {
    dispatch({ type: DELETE_EVENTS_FAILURE, payload: err });
  }
};

// ========================================
// ✔ Get Restaurant Events
// ========================================
export const getRestaurnatsEvents = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_RESTAIRANTS_EVENTS_REQUEST });

  try {
    const response = await api.get(
      `/api/admin/events/restaurant/${restaurantId}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    dispatch({
      type: GET_RESTAIRANTS_EVENTS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: GET_RESTAIRANTS_EVENTS_FAILURE, payload: err });
  }
};

// ========================================
// ✔ Create Category
// ========================================
export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });

  try {
    const response = await api.post(`/api/admin/category`, reqData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: CREATE_CATEGORY_FAILURE, payload: err });
  }
};

// ========================================
// ✔ Get Restaurant Category
// ========================================
export const getRestaurantsCategory = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });

  try {
    const { data } = await api.get(`/api/category/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: err });
  }
};

// ========================================
// ⭐ Get Reviews for Restaurant
// ========================================
export const getRestaurantReviews = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: "GET_RESTAURANT_REVIEWS_REQUEST" });

  try {
    const { data } = await api.get(`/api/restaurants/${restaurantId}/reviews`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: "GET_RESTAURANT_REVIEWS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "GET_RESTAURANT_REVIEWS_FAILURE",
      payload: err.message,
    });
  }
};

// ========================================
// ⭐ Create Review
// ========================================
export const createReview = ({ restaurantId, rating, comment, jwt }) => async (dispatch) => {
  dispatch({ type: "CREATE_REVIEW_REQUEST" });

  try {
    const { data } = await api.post(
      `/api/reviews`,
      { restaurantId, rating, comment },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    dispatch({
      type: "CREATE_REVIEW_SUCCESS",
      payload: data,
    });

    // Refresh reviews immediately
    dispatch(getRestaurantReviews({ restaurantId, jwt }));
  } catch (err) {
    dispatch({
      type: "CREATE_REVIEW_FAILURE",
      payload: err.message,
    });
  }
};
