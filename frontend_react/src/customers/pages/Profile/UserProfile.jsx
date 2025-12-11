import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../State/Authentication/Action";

const UserProfile = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // When user logs out, I clear the session and redirect them to home
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">

        {/* Displaying a large profile icon just for UI aesthetics */}
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />

        {/* Showing logged-in user’s details (name + email) */}
        <h1 className="py-5 text-2xl font-semibold">
          {auth.user?.fullName}
        </h1>
        <p>Email : {auth.user?.email}</p>

        {/* Logout button – simply clears token + Redux state */}
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
