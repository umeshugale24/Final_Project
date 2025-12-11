import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();

  // When the user clicks the button, I want to send them back to the login screen
  const handleRedirectToLogin = () => {
    navigate("/account/login");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[50vw] mt-20">
        
        {/* Showing the user that their password update worked */}
        <Alert severity="success">
          Password Successfully Changed!
        </Alert>

        <div className="flex justify-center mt-5">
          {/* Button that takes the user back to the login page */}
          <Button
            onClick={handleRedirectToLogin}
            fullWidth
            variant="outlined"
            sx={{ padding: ".8rem 0rem" }}
          >
            Back To Login
          </Button>
        </div>

      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
