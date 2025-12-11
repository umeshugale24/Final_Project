import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";

/**
 * RestaurantDashboard Component
 * ---------------------------------------------------------------
 * This screen displays analytics and data for a specific restaurant.
 * Sections include:
 *   - Recent orders
 *   - Recently added menu items
 *
 * Data is fetched using the restaurant ID present in the URL.
 */

const RestaurantDashboard = () => {
  // Extract restaurant id from URL (e.g., /admin/restaurants/:id)
  const { id: restaurantIdFromURL } = useParams();

  // Access restaurant slice from Redux
  const { restaurant } = useSelector((state) => state);

  const dispatch = useDispatch();

  /**
   * Trigger menu items fetch when dashboard loads.
   * Uses JWT from local storage for authorization.
   */
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurantIdFromURL,
        jwt: jwtToken,
      })
    );
  }, []);

  console.log("Active Restaurant Data -> ", restaurant);

  return (
    <div className="px-2">
      <Grid container spacing={1}>

        {/* RECENT ORDERS TABLE */}
        <Grid item lg={6} xs={12}>
          <OrdersTable name="Recent Orders" isDashboard={true} />
        </Grid>

        {/* LATEST MENU ITEMS TABLE */}
        <Grid item lg={6} xs={12}>
          <MenuItemTable name="Recently Added Menu" isDashboard={true} />
        </Grid>

      </Grid>
    </div>
  );
};

export default RestaurantDashboard;
