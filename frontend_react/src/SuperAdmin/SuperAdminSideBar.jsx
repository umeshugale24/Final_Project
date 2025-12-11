import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";

// -------------------------------
// Sidebar Navigation Items
// -------------------------------
const sidebarLinks = [
  { label: "Dashboard", icon: <Dashboard />, path: "/" },
  { label: "Restaurants", icon: <ShoppingBagIcon />, path: "/restaurants" },
  { label: "Customers", icon: <ShopTwoIcon />, path: "/customers" },
  { label: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function SuperAdminSidebar({ handleClose, open }) {
  const isMobile = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Debugging helper for development
  console.log("URL Param - restaurantId:", id);

  // -----------------------------------------------
  // Handle Sidebar Navigation
  // -----------------------------------------------
  const handleNavigation = (menuItem) => {
    // Navigate to selected section inside SuperAdmin routes
    navigate(`/super-admin${menuItem.path}`);

    // If logout selected → clear session + redirect
    if (menuItem.label === "Logout") {
      dispatch(logout());
      navigate("/");
    }

    // Close sidebar on mobile for better UX
    if (isMobile && handleClose) handleClose();
  };

  return (
    <div>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor="left"
        open={open}
        onClose={handleClose}
        // Mobile → temporary drawer, Desktop → permanent drawer
        variant={isMobile ? "temporary" : "permanent"}
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl space-y-8">
          <Divider />

          {/* Render Menu Items */}
          {sidebarLinks.map((item, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => handleNavigation(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer hover:text-blue-600 transition-all"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
