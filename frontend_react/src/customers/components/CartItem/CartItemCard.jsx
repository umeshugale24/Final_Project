import { Button, Chip, Divider, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cart.action";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  // 🔄 I created this helper because every time the user clicks +/-, 
  // I want to update the quantity cleanly and avoid duplicating code.
  const modifyQuantity = (changeBy) => {
    // If quantity goes below 1, I remove the item instead of updating it.
    if (changeBy === -1 && item.quantity === 1) {
      removeItemFromCart();
      return;
    }

    const payload = {
      cartItemId: item.id,
      quantity: item.quantity + changeBy,
    };

    dispatch(
      updateCartItem({
        data: payload,
        jwt: auth.jwt || token,
      })
    );
  };

  // ❌ Separate function because I personally prefer keeping delete logic isolated.
  const removeItemFromCart = () => {
    dispatch(
      removeCartItem({
        cartItemId: item.id,
        jwt: auth.jwt || token,
      })
    );
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        {/* 🖼 I always show the food image so the user remembers what item they added */}
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt={item.food.name}
          />
        </div>

        {/* 📝 This section holds the name, quantity controls, and price */}
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full ">
            <p>{item.food.name}</p>

            {/* ➕➖ Quantity Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {/* Decrease quantity */}
                <IconButton
                  onClick={() => modifyQuantity(-1)}
                  color="primary"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>

                {/* Quantity Display */}
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {item.quantity}
                </div>

                {/* Increase quantity */}
                <IconButton
                  onClick={() => modifyQuantity(1)}
                  color="primary"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>

          {/* 💵 Total price */}
          <p>${item.totalPrice}</p>
        </div>
      </div>

      {/* 🧂 Ingredients list shown as chips */}
      <div className="pt-3 space-x-2">
        {item.ingredients.map((ing, index) => (
          <Chip key={index} label={ing} />
        ))}
      </div>
    </div>
  );
};

export default CartItemCard;
