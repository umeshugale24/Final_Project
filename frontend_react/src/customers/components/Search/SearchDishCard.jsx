import React from "react";
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { useNavigate } from "react-router-dom";

/**
 * SearchDishCard Component
 * -----------------------------------
 * My intention here is simple: show a dish result when a user searches
 * and allow them to directly add that dish to their cart.
 * Also, I let users jump to that dish’s restaurant page.
 */
const SearchDishCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // When user adds an item directly from search results
  const handleAddItemToCart = () => {
    const payload = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
      },
    };

    // Dispatching Redux action to update backend + store
    dispatch(addItemToCart(payload));
  };

  return (
    <Card className="m-3">
      <CardHeader
        className="text-sm"
        title={<p className="text-base">{item.restaurant?.name}</p>}
        action={
          <IconButton
            aria-label="go-to-restaurant"
            onClick={() =>
              navigate(
                `/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`
              )
            }
          >
            <EastIcon />
          </IconButton>
        }
      />

      <CardContent>
        <div className="flex justify-between">
          {/* Dish Details */}
          <div className="w-[70%] space-y-2">
            <p className="font-semibold">{item.name}</p>
            <p>${item.price}</p>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>

          {/* Image + Add Button */}
          <div className="flex flex-col justify-center items-center space-y-2">
            <img
              className="w-[5rem] h-[5rem]"
              src={item.images[0]}
              alt={item.name}
            />
            <Button size="small" onClick={handleAddItemToCart}>
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchDishCard;
