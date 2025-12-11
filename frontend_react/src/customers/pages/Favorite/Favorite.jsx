import React, { useEffect } from "react";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useSelector } from "react-redux";

const Favorite = () => {
  // pulling the logged-in user's data from redux store
  const { auth } = useSelector((store) => store);

  // I might later fetch fresh favorites from the backend,
  // so keeping this structure ready for future improvement.
  useEffect(() => {
    // placeholder for future API call if needed
  }, []);

  return (
    <div>
      {/* Heading for the favorites page */}
      <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>

      {/* Display all restaurants the user has marked as favorite */}
      <div className="flex flex-wrap justify-center">
        {auth.favorites?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} data={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
