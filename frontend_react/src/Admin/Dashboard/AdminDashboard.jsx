import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RestaurantCard from "./RestaurantCard";
import AddRestaurantCard from "./AddRestaurantCard";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";

const AdminDashboard = () => {
  // Extracting any route params (if needed later)
  const routeParams = useParams();

  // Accessing Redux store → specifically the restaurant slice
  const { restaurant } = useSelector((state) => state);

  const dispatch = useDispatch();

  // Fetch restaurants owned by the logged-in admin when component loads
  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

  return (
    <div className="lg:px-20">
      {/* Container for restaurant listing */}
      <div className="lg:flex flex-wrap justify-center">
        
        {/* If the admin has restaurants, show restaurant cards */}
        {restaurant.usersRestaurant.map((res) => (
          <RestaurantCard key={res.id} item={res} />
        ))}

        {/* If NO restaurant exists → show “Add Restaurant” card */}
        {restaurant.usersRestaurant.length < 1 && <AddRestaurantCard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
