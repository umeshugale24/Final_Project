// In this component I'm basically handling the top navigation bar 
// for the admin side (mobile view specifically).  
// I kept the UI exactly the same — only added my own explanations 
// and slightly improved readability.

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { logout } from "../State/Authentication/Action";
import Auth from "../customers/pages/Auth/Auth";
import { IconButton } from "@mui/material";

const AdminNavbar = ({ handleOpenSideBar }) => {
  // I use navigation mainly for redirecting when user interacts with navbar icons.
  const navigate = useNavigate();

  // Getting auth and cart state in case I need to show user/cart info later.
  const { auth, cart } = useSelector((store) => store);

  // Dispatch is required for logout, authentication triggers, etc.
  const dispatch = useDispatch();

  return (
    // This bar appears on mobile devices; on large screens it's hidden (lg:hidden).
    <div className="lg:hidden px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      
      {/* Left section: Hamburger menu + Logo */}
      <div className="flex items-center space-x-4">
        
        {/* Menu icon triggers the sidebar from parent component */}
        <div className="cursor-pointer flex items-center space-x-4">
          <IconButton onClick={handleOpenSideBar}>
            <MenuIcon />
          </IconButton>

          {/* Just showing project logo/name */}
          <li className="logo font-semibold text-gray-300 text-2xl">
            Snap Eats
          </li>
        </div>
      </div>

      {/* Right section intentionally left empty for now,
          but this is where logout/profile/search/cart could go */}
    </div>
  );
};

export default AdminNavbar;
