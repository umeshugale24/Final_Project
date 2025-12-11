import React from "react";
import { Route, Routes } from "react-router-dom";

// Super Admin Components
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import RestaurantTable from "./Restaurants/RestaurantTable";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import RestaurantRequest from "./RestaurantRequest/RestaurantRequest";

/**
 * SuperAdmin Component
 * --------------------
 * This layout represents the main control panel for the Super Admin.
 * It includes:
 *  - Sidebar navigation (fixed on the left)
 *  - A dynamic content area where pages (customers, restaurants…)
 *    load based on selected routes.
 * 
 * From my perspective as the developer, this acts like the root entry point
 * for all SuperAdmin-level screens inside the app.
 */

const SuperAdmin = () => {
  return (
    <div className="lg:flex justify-between">

      {/* Left Section → Sidebar Navigation */}
      <div>
        <SuperAdminSidebar />
      </div>

      {/* Right Section → Dynamic Page Rendering */}
      <div className="w-[80vw]">
        <Routes>
          {/* Customers Management Page */}
          <Route path="customers" element={<Customers />} />

          {/* Restaurants Overview / Management */}
          <Route path="restaurants" element={<SuperAdminRestaurant />} />

          {/* 
            Additional routes like:
            - Requests
            - Approvals
            - Menu management
            can be plugged in here easily whenever needed.
          */}
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
