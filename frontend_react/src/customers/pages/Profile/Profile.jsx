import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Routes, Route } from "react-router-dom";

// Individual profile sections
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";

const Profile = () => {
  /*
    This component represents the main profile area for users.
    I’m keeping the layout simple: a sidebar for navigation and
    a dynamic content section that changes based on selected route.
  */

  return (
    <div className="lg:flex justify-between">
      
      {/* Left-side navigation panel (sticky on large screens) */}
      <div className="sticky h-[80vh] lg:w-[20%]">
        {/* Sidebar menu for profile-related routes */}
        <ProfileNavigation />
      </div>

      {/* Main content area where nested routes render */}
      <div className="lg:w-[80%]">
        <Routes>
          {/* Default profile overview */}
          <Route path="/" element={<UserProfile />} />

          {/* User orders page */}
          <Route path="/orders" element={<Orders />} />

          {/* Saved addresses */}
          <Route path="/address" element={<UsersAddresses />} />

          {/* Favorites list */}
          <Route path="/favorites" element={<Favorite />} />

          {/* Placeholder: Payments can reuse Orders or later be replaced */}
          <Route path="/payments" element={<Orders />} />

          {/* Events available for this customer */}
          <Route path="/events" element={<CustomerEvents />} />

          {/* Notifications page */}
          <Route path="/notification" element={<Notifications />} />
        </Routes>
      </div>

    </div>
  );
};

export default Profile;
