// Admin.jsx
// -------------------------------------------------------------
//  this component represents the "control center"
// for the restaurant admin. From here I load sidebar, navbar,
// and all nested admin screens like orders, menu, ingredients, etc.
// -------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import RestaurantDashboard from "./Dashboard/RestaurantDashboard";
import RestaurantsOrder from "./Orders/RestaurantsOrder";
import RestaurantsMenu from "./Food/RestaurantsMenu";
import AddMenuForm from "./Food/AddMenuForm";
import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm";
import EventPage from "./Events/Events";
import Category from "./Category/Category";
import Ingredients from "./Ingredients/Ingredients";
import Details from "./Details/Details";
import AdminNavbar from "./AdminNavbar";

import { useDispatch, useSelector } from "react-redux";

import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
} from "../State/Admin/Ingredients/Action";

import { getRestaurantsCategory } from "../State/Customers/Restaurant/restaurant.action";

import { fetchRestaurantsOrder } from "../State/Admin/Order/restaurants.order.action";

const Admin = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // my small handlers for toggling sidebar visibility
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // -------------------------------------------------------------------
  // Whenever the logged-in admin's restaurant loads,
  // I immediately refresh all the essential master data:
  // - Ingredient categories
  // - Ingredients list
  // - Restaurant's categories
  // - Orders for this restaurant
  //
  // This ensures the admin dashboard always stays consistent.
  // -------------------------------------------------------------------
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      const restaurantId = restaurant.usersRestaurant?.id;

      dispatch(getIngredientCategory({ jwt, id: restaurantId }));
      dispatch(getIngredientsOfRestaurant({ jwt, id: restaurantId }));
      dispatch(
        getRestaurantsCategory({
          jwt: auth.jwt || jwt,
          restaurantId,
        })
      );
      dispatch(
        fetchRestaurantsOrder({
          restaurantId,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
      {/* Top navbar for quick navigation */}
      <AdminNavbar handleOpenSideBar={openSidebar} />

      <div className="lg:flex justify-between">
        {/* Collapsible sidebar for the admin menu */}
        <div>
          <AdminSidebar open={isSidebarOpen} handleClose={closeSidebar} />
        </div>

        {/* Main page content */}
        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/menu" element={<RestaurantsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
