import React from "react";
import "./Restaurant.css";
import { useNavigate } from "react-router-dom";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../../State/Authentication/Action";
import { isPresentInFavorites } from "../../../config/logic";

const RestaurantCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // grabbing auth from redux so I can check favorites + user role
  const { auth } = useSelector((store) => store);

  // fetching JWT for API calls
  const savedToken = localStorage.getItem("jwt");

  // when user clicks heart icon → add restaurant to favorites
  const handleFavoriteToggle = () => {
    dispatch(
      addToFavorites({
        restaurantId: data.id,
        jwt: auth.jwt || savedToken,
      })
    );
  };

  // on clicking restaurant card → navigate to restaurant page only if it's open
  const handleNavigateToRestaurant = () => {
    if (data.open) {
      navigate(
        `/restaurant/${data.address.city}/${data.name}/${data.id}`
      );
    }
  };

  return (
    <Card className="m-5 w-[18rem] productCard">
      
      {/* Image wrapper – clickable only when the restaurant is open */}
      <div
        onClick={handleNavigateToRestaurant}
        className={`${data.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={data.images[0]}
          alt={data.name}
        />

        {/* Showing whether restaurant is open or closed */}
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data.open ? "success" : "error"}
          label={data.open ? "Open" : "Closed"}
        />
      </div>

      {/* Bottom section of the card */}
      <div className="p-4 textPart lg:flex w-full justify-between">
        
        {/* Restaurant info */}
        <div className="space-y-1">
          <p className="font-semibold text-lg">{data.name}</p>

          {/* Short description just to keep UI clean */}
          <p className="text-gray-500 text-sm">
            {data.description.length > 40
              ? data.description.substring(0, 40) + "..."
              : data.description}
          </p>
        </div>

        {/* Favorite icon toggle */}
        <div>
          <IconButton onClick={handleFavoriteToggle}>
            {isPresentInFavorites(auth.favorites, data) ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
