// ---------------------------------------------
// Component: RestaurantMenuScreen
// Purpose : Wrapper component to display all menu items
// ---------------------------------------------

import React from "react";
import MenuItemTable from "./MenuItemTable";

const RestaurantMenuScreen = () => {
  return (
    <div className="px-2">
      {/* Reusing the table component and passing a custom title */}
      <MenuItemTable titleLabel={"All Menu Items"} />
    </div>
  );
};

export default RestaurantMenuScreen;
