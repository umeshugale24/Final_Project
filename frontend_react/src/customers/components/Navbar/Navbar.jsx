import React, { useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { pink } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);

  // I'm using this state to track whether the profile dropdown should be visible
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const menuOpen = Boolean(profileMenuAnchor);

  // When user clicks their avatar, I open the dropdown
  const openProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  // Close the dropdown when clicked outside
  const closeProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  // When user clicks the cart icon, just send them to cart page
  const goToCart = () => {
    navigate("/cart");
  };

  // Based on the user's role, I send them to the right dashboard or profile
  const goToProfile = () => {
    if (auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant");
    } else {
      navigate("/my-profile");
    }
  };

  // To close the authentication modal (if opened)
  const closeAuthModal = () => {
    navigate("/");
  };

  // Clicking logo should always bring user home
  const goHome = () => {
    navigate("/");
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    closeProfileMenu();
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#ff5722] lg:px-20 flex justify-between">
      
      {/* ------------ LEFT SECTION (Logo) -------------- */}
      <div className="flex items-center space-x-4">
        <div
          onClick={goHome}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <li className="logo font-semibold text-gray-300 text-2xl">
            Snap Eats
          </li>
        </div>
      </div>

      {/* ------------ RIGHT SECTION (Search, Profile, Cart) -------------- */}
      <div className="flex items-center space-x-2 lg:space-x-10">

        {/* Search Button */}
        <IconButton onClick={() => navigate("/search")}>
          <SearchIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        {/* Profile / Login logic */}
        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            // If user is logged in, show Avatar
            <span
              aria-controls={menuOpen ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_ADMIN"
                  ? openProfileMenu
                  : goToProfile
              }
              className="cursor-pointer"
            >
              <Avatar
                sx={{ bgcolor: "white", color: pink.A400 }}
              >
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            // If not logged in, show login icon
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}

          {/* Profile Menu (Admin only) */}
          <Menu
            id="profile-menu"
            anchorEl={profileMenuAnchor}
            open={menuOpen}
            onClose={closeProfileMenu}
            MenuListProps={{
              "aria-labelledby": "profile-menu-button",
            }}
          >
            <MenuItem
              onClick={() => {
                if (auth.user?.role === "ROLE_ADMIN") {
                  navigate("/super-admin/customers");
                } else if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
                  navigate("/admin/restaurant");
                } else {
                  navigate("/my-profile");
                }
              }}
            >
              Profile
            </MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        {/* Cart icon – only visible for normal users */}
        {auth.user?.role !== "ROLE_ADMIN" && (
          <IconButton onClick={goToCart}>
            <Badge color="black" badgeContent={cart.cartItems.length}>
              <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
            </Badge>
          </IconButton>
        )}
      </div>

      {/* Authentication Modal */}
      <Auth handleClose={closeAuthModal} />
    </div>
  );
};

export default Navbar;
