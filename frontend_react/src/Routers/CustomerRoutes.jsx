import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../customers/pages/Home/HomePage";
import Navbar from "../customers/components/Navbar/Navbar";
import Cart from "../customers/pages/Cart/Cart";
import Profile from "../customers/pages/Profile/Profile";
import PaymentSuccess from "../customers/pages/PaymentSuccess/PaymentSuccess";
import Search from "../customers/components/Search/Search";
import CreateRestaurantForm from "../Admin/AddRestaurants/CreateRestaurantForm";
import Restaurant from "../customers/pages/Restaurant/Restaurant";
import PasswordChangeSuccess from "../customers/pages/Auth/PasswordChangeSuccess";
import NotFound from "../customers/pages/NotFound/NotFound";

const CustomerRoutes = () => {
  return (
    <div className="relative">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>

      {/* App Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:register" element={<HomePage />} />

        <Route
          path="/restaurant/:city/:title/:id"
          element={<Restaurant />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        <Route path="/my-profile/*" element={<Profile />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/admin/add-restaurant"
          element={<CreateRestaurantForm />}
        />

        <Route
          path="/password_change_success"
          element={<PasswordChangeSuccess />}
        />

        {/* Catch-all Route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default CustomerRoutes;
