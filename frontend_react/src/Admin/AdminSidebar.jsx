import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";

// logout action
import { logout } from "../State/Authentication/Action";

/**
 * Side navigation list used inside the drawer.
 * I keep this structure simple so I can loop through it easily.
 */
const sideNavItems = [
  { label: "Dashboard", icon: <Dashboard />, route: "/" },
  { label: "Orders", icon: <ShoppingBagIcon />, route: "/orders" },
  { label: "Menu", icon: <ShopTwoIcon />, route: "/menu" },
  { label: "Food Category", icon: <CategoryIcon />, route: "/category" },
  { label: "Ingredients", icon: <FastfoodIcon />, route: "/ingredients" },
  { label: "Events", icon: <EventIcon />, route: "/event" },
  { label: "Details", icon: <AdminPanelSettingsIcon />, route: "/details" },
  { label: "Logout", icon: <LogoutIcon />, route: "/" },
];

const AdminSidebar = ({ handleClose, open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // I am using media query because I want the drawer
  // to behave differently on small screens.
  const isMobileView = useMediaQuery("(max-width:1080px)");

  /**
   * Handles navigation for each sidebar item.
   * From my POV, this keeps routing centralized and clean.
   */
  const handleSidebarClick = (menuItem) => {
    // Navigate to the admin route
    navigate(`/admin/restaurant${menuItem.route}`);

    // If user clicked logout, then clear session and go home
    if (menuItem.label === "Logout") {
      dispatch(logout());
      navigate("/");
    }

    // Close drawer on mobile screens so UI feels smoother
    handleClose();
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          sx={{ zIndex: 1 }}
          anchor="left"
          open={open}
          onClose={handleClose}
          variant={isMobileView ? "temporary" : "permanent"} // I prefer this so the drawer stays open on desktop
        >
          <div className="w-[70vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl space-y-[1.6rem]">

            {sideNavItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() => handleSidebarClick(menuItem)}
                  className="px-5 flex items-center space-x-5 cursor-pointer hover:text-pink-600"
                >
                  {menuItem.icon}
                  <span>{menuItem.label}</span>
                </div>

                {/* Adding divider between menu items (except last one) */}
                {index !== sideNavItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default AdminSidebar;
