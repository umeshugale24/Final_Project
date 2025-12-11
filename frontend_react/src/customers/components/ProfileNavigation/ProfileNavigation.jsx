import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";

// Menu list for profile navigation drawer
// I use this array so that UI stays clean and scalable
const profileOptions = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notification", icon: <NotificationsIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ handleClose, open }) => {
  const isMobileView = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // When user clicks logout from drawer menu
  const triggerLogout = () => {
    dispatch(logout());
  };

  // Handles routing for each menu option
  // From my POV: this keeps navigation centralized & clean
  const handleNavigation = (option) => {
    navigate(`/my-profile/${option.title.toLowerCase()}`);

    // If user selects logout, clear auth state and redirect home
    if (option.title === "Logout") {
      triggerLogout();
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor="left"
        open={open}
        onClose={handleClose}
        // Using temporary drawer for mobile and permanent for desktop
        variant={isMobileView ? "temporary" : "permanent"}
      >
        {/* Sidebar container */}
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl space-y-8 pt-16">
          
          {profileOptions.map((option, index) => (
            <React.Fragment key={index}>
              {/* Single menu item row */}
              <div
                onClick={() => handleNavigation(option)}
                className="px-5 flex items-center space-x-5 cursor-pointer hover:text-pink-500 transition-all"
              >
                {option.icon}
                <span>{option.title}</span>
              </div>

              {/* Divider between items except for last one */}
              {index !== profileOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}

        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default ProfileNavigation;
