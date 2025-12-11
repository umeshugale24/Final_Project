import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Admin from "../Admin/Admin";
import CreateRestaurantForm from "../Admin/AddRestaurants/CreateRestaurantForm";

const AdminRouters = () => {
  const { restaurant } = useSelector((state) => state);

  const RenderComponent = () => {
    // If the logged-in user does NOT have a restaurant setup → show create form
    if (!restaurant.usersRestaurant) {
      return <CreateRestaurantForm />;
    }
    // Otherwise → load Admin panel
    return <Admin />;
  };

  return (
    <div>
      <Routes>
        <Route path="/*" element={<RenderComponent />} />
      </Routes>
    </div>
  );
};

export default AdminRouters;
