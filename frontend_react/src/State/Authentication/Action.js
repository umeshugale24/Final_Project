import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
} from "./ActionType";

import { API_URL, api } from "../../config/api";
import axios from "axios";

/* -------------------------------------------
   USER REGISTRATION
-------------------------------------------- */
export const registerUser = (reqData) => async (dispatch) => {
  console.log("Registering user:", reqData.userData);

  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    // Navigate based on user role
    reqData.navigate(
      data.role === "ROLE_RESTAURANT_OWNER"
        ? "/admin/restaurant"
        : "/"
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.error("Registration Error:", error);

    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* -------------------------------------------
   USER LOGIN
-------------------------------------------- */
export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.data
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    // Redirect based on role
    reqData.navigate(
      data.role === "ROLE_RESTAURANT_OWNER"
        ? "/admin/restaurant"
        : "/"
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* -------------------------------------------
   FETCH CURRENT USER PROFILE
-------------------------------------------- */
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const response = await api.get(`/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userProfile = response.data;

    console.log("Fetched User Profile:", userProfile);

    dispatch({ type: GET_USER_SUCCESS, payload: userProfile });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.message,
    });
  }
};

/* -------------------------------------------
   ADD RESTAURANT TO FAVORITES
-------------------------------------------- */
export const addToFavorites = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITES_REQUEST });

  try {
    const { data } = await api.put(
      `api/restaurants/${restaurantId}/add-favorites`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    console.log("Favorite Added:", data);

    dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
  } catch (error) {
    console.error("Favorite Error:", error);

    dispatch({
      type: ADD_TO_FAVORITES_FAILURE,
      payload: error.message,
    });
  }
};

/* -------------------------------------------
   REQUEST PASSWORD RESET EMAIL
-------------------------------------------- */
export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({ type: REQUEST_RESET_PASSWORD_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/auth/reset-password-request?email=${email}`,
      {}
    );

    console.log("Password reset email sent:", data);

    dispatch({
      type: REQUEST_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Reset Password Request Error:", error);

    dispatch({
      type: REQUEST_RESET_PASSWORD_FAILURE,
      payload: error.message,
    });
  }
};

/* -------------------------------------------
   RESET PASSWORD USING TOKEN
-------------------------------------------- */
export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({ type: REQUEST_RESET_PASSWORD_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/auth/reset-password`,
      reqData.data
    );

    console.log("Password Updated Successfully:", data);

    reqData.navigate("/password-change-success");

    dispatch({
      type: REQUEST_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Password Reset Error:", error);

    dispatch({
      type: REQUEST_RESET_PASSWORD_FAILURE,
      payload: error.message,
    });
  }
};

/* -------------------------------------------
   USER LOGOUT
-------------------------------------------- */
export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
