import React, { useEffect } from "react";
import "./HomePage.css";

import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";

import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";

/*
  Home Page Component
  -------------------
  My goal here is to show the hero banner, popular meals carousel,
  and the list of restaurants fetched from backend.
*/

const HomePage = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);

  // Whenever the user logs in (auth.user becomes available),
  // I fetch all restaurants for the home screen.
  useEffect(() => {
    if (auth.user) {
      const token = localStorage.getItem("jwt");
      dispatch(getAllRestaurantsAction(token));
    }
  }, [auth.user]);

  return (
    <div>
      {/* ------------------------------ Hero Banner Section ------------------------------ */}
      <section className="banner relative flex flex-col justify-center items-center -z-50">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold py-5">Snap Eats</p>
          <p className="text-gray-300 text-xl lg:text-4xl">
            Your Cravings, Just a Snap Away.
          </p>
        </div>

        {/* Overlay + Fadeout for aesthetic UI */}
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      {/* ------------------------------ Popular Meals Section ------------------------------ */}
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Popular Meals
        </p>

        {/* Carousel showing trending meals */}
        <MultipleItemsCarousel />
      </section>

      {/* ------------------------------ Restaurants Section ------------------------------ */}
      <section className="px-5 lg:px-20">
        <h1 className="text-2xl font-semibold text-gray-400 py-3">
          Savor Our Curated Favorites.
        </h1>

        <div className="flex flex-wrap items-center justify-around">
          {restaurant.restaurants.map((item, index) => (
            <RestaurantCard key={index} data={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
