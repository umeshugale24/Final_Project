// This component is my small UI card that shows an individual ordered food item.
// I keep it simple—one side holds the food info, the other side displays the order status.

import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({ order, status }) => {
  return (
    // Card container for each order row
    <Card className="flex justify-between items-center p-5">

      {/* Left section → image + name + price */}
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16 object-cover"
          src={order.food.images[0]}  // showing the first image of the food
          alt={order.food.name}
        />

        <div>
          {/* Food name */}
          <p className="font-medium">{order.food.name}</p>

          {/* Food price */}
          <p className="text-gray-400">${order.food.price}</p>
        </div>
      </div>

      {/* Right section → status button (disabled by design) */}
      <div>
        {/* 
          I’m showing the current status here but the button is non-clickable
          because I'm only using it as an indicator.
        */}
        <Button 
          variant="contained" 
          className="cursor-not-allowed"
        >
          {status}
        </Button>
      </div>

    </Card>
  );
};

export default OrderCard;
