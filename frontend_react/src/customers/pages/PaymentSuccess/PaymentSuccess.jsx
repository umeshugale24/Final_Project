import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // When this screen loads, I want the user's cart to be cleared
  useEffect(() => {
    dispatch(clearCartAction());
  }, []);

  // Redirect user back to home after viewing success message
  const goToHomePage = () => navigate("/");

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">

        {/* Success Box Section */}
        <div className="w-full lg:w-1/4 flex flex-col items-center rounded-md">

          {/* Icon indicating order success */}
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />

          {/* Main success heading */}
          <h1 className="py-5 text-2xl font-semibold">Order Placed Successfully!</h1>

          {/* Short appreciation note */}
          <p className="py-3 text-center text-gray-400">
            Your order is confirmed 🎉 <br />
            We’re already getting things ready for you!
          </p>

          {/* Positive sign-off message */}
          <p className="py-2 text-center text-gray-200 text-lg">
            Thanks for choosing Snap Eats — Enjoy your meal!
          </p>

          {/* CTA Button back to home */}
          <Button
            variant="contained"
            sx={{ margin: "1rem 0rem" }}
            onClick={goToHomePage}
          >
            Back To Home
          </Button>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
