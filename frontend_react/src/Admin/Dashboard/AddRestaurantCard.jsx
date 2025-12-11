// Component to display a card that lets the admin navigate to the
// "Create New Restaurant" page when clicked.

import { Card } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddNewRestaurantCard = () => {
  // React Router hook used for programmatic navigation
  const redirect = useNavigate();

  // Handler to move user to "Add Restaurant" form
  const goToCreateRestaurant = () => {
    redirect("/admin/add-restaurant");
  };

  return (
    <Card
      onClick={goToCreateRestaurant} // Navigate on card click
      className="flex items-center justify-center px-5 min-h-[30rem]"
      sx={{ width: 345, m: "1rem" }}
    >
      <div className="flex flex-col items-center">
        {/* Big plus icon to show purpose visually */}
        <AddIcon sx={{ fontSize: "7rem" }} />

        {/* Title text */}
        <h1 className="font-semibold text-gray-200 text-center">
          Add New Restaurants
        </h1>
      </div>
    </Card>
  );
};

export default AddNewRestaurantCard;
