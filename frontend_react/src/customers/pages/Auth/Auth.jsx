import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../components/Register/Register";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/Login";
import ResetPasswordRequest from "./ResetPaswordRequest";
import { useSelector } from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm";

// Modal styling – keeping it consistent across all auth screens
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Auth = ({ open, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  // I am using Snackbar to show success/error messages from backend
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // Whenever authentication success/error changes, I want Snackbar to display instantly
  useEffect(() => {
    if (auth.success || auth.error) {
      setOpenSnackBar(true);
    }
  }, [auth.success, auth.error]);

  // Closes Snackbar
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  // Helper boolean to decide if modal should be visible based on URL
  const isAuthPage =
    location.pathname === "/account/register" ||
    location.pathname === "/account/login" ||
    location.pathname === "/account/reset-password-request" ||
    location.pathname === "/account/reset-password";

  // Method to dynamically render the correct auth component based on URL
  const renderAuthComponent = () => {
    if (location.pathname === "/account/register") return <RegistrationForm />;
    if (location.pathname === "/account/login") return <LoginForm />;
    if (location.pathname === "/account/reset-password")
      return <ResetPasswordForm />;

    // Default screen → Reset password request page
    return <ResetPasswordRequest />;
  };

  return (
    <>
      {/* This modal acts like a container for all authentication-related pages */}
      <Modal open={isAuthPage} onClose={handleClose}>
        <Box sx={style}>
          {/* I am placing the dynamic auth screen here */}
          {renderAuthComponent()}

          {/* This section handles navigation between auth routes */}
          <div className="flex justify-center mt-5">
            {location.pathname === "/account/reset-password-request" ||
            location.pathname === "/account/reset-password" ? (
              // When user is on reset pages → show button to go back to login
              <Button onClick={() => navigate("/account/login")}>
                Go Back To Login
              </Button>
            ) : (
              // On login/signup → show reset password link
              <Button onClick={() => navigate("/account/reset-password-request")}>
                Forgot Password
              </Button>
            )}

            {/* Snackbar showing backend auth success/error messages */}
            <Snackbar
              sx={{ zIndex: 50 }}
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleCloseSnackBar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity={auth.error ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {/* I display whichever message backend sends */}
                {auth.success || auth.error}
              </Alert>
            </Snackbar>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
