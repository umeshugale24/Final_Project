import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // I'm using this state to track which optional ingredients the user selects.
  const [chosenIngredients, setChosenIngredients] = useState([]);

  // When user checks/unchecks an ingredient, I manually toggle it in state.
  const handleIngredientToggle = (ingredientName) => {
    const alreadySelected = chosenIngredients.includes(ingredientName);

    if (alreadySelected) {
      // remove
      setChosenIngredients((prev) =>
        prev.filter((ing) => ing !== ingredientName)
      );
    } else {
      // add
      setChosenIngredients((prev) => [...prev, ingredientName]);
    }
  };

  // When user clicks "Add to cart" inside the accordion.
  const handleAddToCart = () => {
    const payload = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: chosenIngredients, // send selected ingredients
      },
    };

    dispatch(addItemToCart(payload));
  };

  return (
    <>
      <Accordion>
        {/* This is the header row of the accordion which displays basic menu item info */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="menu-item-content"
          id="menu-item-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:space-x-5">
              {/* Menu Item Image */}
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt={item.name}
              />

              {/* Name, price, description */}
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>${item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>

        {/* Expanded section to show ingredient options */}
        <AccordionDetails>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // avoid page refresh
              handleAddToCart();
            }}
          >
            <div className="flex gap-5 flex-wrap">
              {/* Looping over categorized ingredients (ex: Veggies, Dairy, Spices) */}
              {Object.keys(categorizedIngredients(item?.ingredients))?.map(
                (group) => (
                  <div key={group} className="pr-5">
                    <p className="font-semibold">{group}</p>

                    {/* Displaying ingredient checkboxes under each category */}
                    <FormGroup>
                      {categorizedIngredients(item?.ingredients)[group].map(
                        (ingredient) => (
                          <FormControlLabel
                            key={ingredient.name}
                            control={
                              <Checkbox
                                checked={chosenIngredients.includes(
                                  ingredient.name
                                )}
                                onChange={() =>
                                  handleIngredientToggle(ingredient.name)
                                }
                                disabled={!ingredient.inStoke} // disable if out of stock
                              />
                            }
                            label={ingredient.name}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>

            {/* Add-to-cart button */}
            <div className="pt-5">
              <Button
                variant="contained"
                type="submit"
                disabled={!item.available}
              >
                {item.available ? "Add To Cart" : "Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MenuItemCard;
