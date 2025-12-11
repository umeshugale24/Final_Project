import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import Admin from "../Admin/Admin";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
import { useSelector } from "react-redux";
import NotFound from "../customers/pages/NotFound/NotFound";
import IngredientsList from "../Data/Demo";
import CreateRestaurantForm from "../Admin/AddRestaurants/CreateRestaurantForm";
import AdminRouters from "./AdminRouters";
import PaymentSuccess from "../customers/pages/PaymentSuccess/PaymentSuccess";

const Routers = () => {

  return (
    <>
      <Routes>

        {/* SUPER ADMIN ROUTES */}
        <Route
          path="/super-admin/*"
          element={<SuperAdmin />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/restaurant/*"
          element={<AdminRouters />}
        />

        {/* CUSTOMER ROUTES */}
        <Route path="/payment/success" element={<PaymentSuccess />} />

        <Route
          path="/*"
          element={<CustomerRoutes />}
        />

      </Routes>
    </>
  );
};

export default Routers;