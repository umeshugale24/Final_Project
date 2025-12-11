import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topmeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../State/Customers/Menu/menu.action";

const Search = () => {
  const dispatch = useDispatch();
  const { menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // 👉 Whenever user types something, I trigger a Redux action 
  // to search menu items from backend.
  const handleSearchInput = (text) => {
    dispatch(searchMenuItem({ keyword: text, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="px-5 lg:px-[18vw]">

      {/* 🔍 Search Bar Section */}
      <div className="relative py-5">
        {/* Search Icon inside input field */}
        <SearchIcon className="absolute top-[2rem] left-2" />

        <input
          onChange={(e) => handleSearchInput(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="Search for food..."
        />
      </div>

      {/* ⭐ Popular Cuisines Section */}
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>

        {/* I’m looping through the dummy cuisine list just to show 
            some trending food categories */}
        <div className="flex flex-wrap">
          {topmeels.slice(0, 9).map((meal, idx) => (
            <PopularCuisines key={idx} image={meal.image} title={meal.title} />
          ))}
        </div>
      </div>

      {/* 🍽 Search Results Section */}
      <div className="mt-7">
        {/* Display the list of dishes returned from backend */}
        {menu.search.map((foodItem, index) => (
          <SearchDishCard key={index} item={foodItem} />
        ))}
      </div>

    </div>
  );
};

export default Search;
