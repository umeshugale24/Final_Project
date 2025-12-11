import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import darkTheme from "./theme/DarkTheme";
import Routers from "./Routers/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getUser } from "./State/Authentication/Action";
import { findCart } from "./State/Customers/Cart/cart.action";
import {
  getAllRestaurantsAction,
  getRestaurantByUserId,
} from "./State/Customers/Restaurant/restaurant.action";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  // Fetch stored JWT once — prevents unnecessary re-reading from localStorage
  const jwt = localStorage.getItem("jwt");

  /**
   * 📌 Purpose of this useEffect:
   * - When the user logs in (i.e., JWT becomes available),
   *   I want to load all essential user-related data upfront.
   * - This includes:
   *     ✔ User profile
   *     ✔ Cart data
   *     ✔ All restaurant listings (for customers)
   */
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
      dispatch(getAllRestaurantsAction(jwt));
    }
    // auth.jwt triggers re-run only when login happens
  }, [auth.jwt]);

  /**
   * 📌 For restaurant owners:
   * - As soon as the authenticated user is identified as a restaurant owner,
   *   we fetch their restaurant details.
   * - This ensures dashboard pages load instantly with owner's restaurant info.
   */
  useEffect(() => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
