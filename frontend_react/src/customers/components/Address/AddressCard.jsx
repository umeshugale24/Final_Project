import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

/**
 * AddressCard Component
 *
 * My intention behind this component:
 * - Display a single saved address in a clean card layout.
 * - Optionally allow the user to "select" an address when checking out.
 * - Keep the UI simple and reusable across the app.
 *
 * Props:
 *  item -> The actual address object I want to display.
 *  handleSelectAddress -> Function I call when user selects this address.
 *  showButton -> Boolean so I can reuse the card in places where selection isn't needed.
 */

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  return (
    <Card className="flex space-x-5 w-64 p-5">
      
      {/* I chose a Home icon just to visually indicate this card is an address */}
      <HomeIcon />

      <div className="space-y-3 text-gray-500">
        {/* Displaying the title for readability.
           Hard-coded as "Home" but can be extended to "Work", "Other", etc. */}
        <h1 className="font-semibold text-lg text-white">Home</h1>

        {/* Showing the full address.
           I prefer inline formatting here to avoid unnecessary string builders. */}
        <p>
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
        </p>

        {/* I only show the Select button when this card is used on the checkout page. */}
        {showButton && (
          <Button
            onClick={() => handleSelectAddress(item)}
            variant="outlined"
            className="w-full"
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
