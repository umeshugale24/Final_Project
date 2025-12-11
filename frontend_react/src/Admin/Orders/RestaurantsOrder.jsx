import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../State/Admin/Order/restaurants.order.action";

// List of order statuses I want the Super Admin to filter by.
// Keeping it short and simple for now.
const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "all" },
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // JWT stored in localStorage — I’m using it because my API calls depend on it.
  const jwt = localStorage.getItem("jwt");

  // Fetching restaurant + auth state so I can send proper data and token to my API.
  const { restaurant, auth } = useSelector((store) => store);

  // Extract current filter from URL.
  // Using this approach allows me to persist filters even if user reloads the page.
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(() => {
    // Every time the auth token or filter changes, I trigger API call.
    // This ensures my table stays in sync with the current filter state.
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        orderStatus: filterValue,
        jwt: auth.jwt || jwt,
      })
    );
  }, [auth.jwt, filterValue]);

  // Whenever user toggles a radio button, I update URL parameters.
  // I prefer URL-based filters since they make the UI sharable and reload-safe.
  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      // If "All" is selected, I remove the query parameter entirely.
      searchParams.delete("order_status");
    } else {
      // Otherwise, I set the selected status.
      searchParams.set("order_status", e.target.value);
    }

    const query = searchParams.toString();

    // Navigating with updated query automatically reloads the filtered data.
    navigate({ search: `?${query}` });
  };

  return (
    <div className="px-2">
      <Card className="p-5">
        {/* Simple heading for better visual structure */}
        <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
          Order Status
        </Typography>

        {/* Radio filter group – helps admins quickly switch between statuses */}
        <FormControl className="py-10" component="fieldset">
          <RadioGroup
            row
            name="category"
            // If no filter is present, defaulting to "all"
            value={filterValue ? filterValue : "all"}
            onChange={handleFilter}
          >
            {orderStatus.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      {/* OrderTable is rendered below the filters.
          Passing a simple name prop to display dynamic heading inside the table. */}
      <OrdersTable name={"All Orders"} />
    </div>
  );
};

export default RestaurantsOrder;
