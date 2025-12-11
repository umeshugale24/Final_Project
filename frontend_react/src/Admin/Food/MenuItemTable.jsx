import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Customers/Menu/menu.action";

import { categorizedIngredients } from "../../customers/util/CategorizeIngredients";

import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@mui/icons-material";

/**
 * MenuItemTable Component
 * --------------------------------------------------------
 * Displays a list of menu items of a restaurant in table form.
 * Used both in Admin Dashboard and Restaurant Dashboard.
 *
 * Props:
 *   - isDashboard: boolean → hides some columns when true
 *   - name: heading/title to display above the card
 */
const MenuItemTable = ({ isDashboard, titleLabel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Redux stores
  const { menu, ingredients, restaurant, auth } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  /**
   * Fetch menu items once restaurant data is available
   */
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt,
          seasonal: false,
          vegetarian: false,
          nonveg: false,
          foodCategory: "",
        })
      );
    }
  }, [ingredients.update, restaurant.usersRestaurant]);

  /**
   * Toggle food availability (In Stock / Out of Stock)
   */
  const toggleFoodAvailability = (foodId) => {
    dispatch(
      updateMenuItemsAvailability({
        foodId,
        jwt: auth.jwt || jwt,
      })
    );
  };

  /**
   * Delete menu item
   */
  const removeFoodItem = (foodId) => {
    dispatch(
      deleteFoodAction({
        foodId,
        jwt: auth.jwt || jwt,
      })
    );
  };

  return (
    <Box width={"100%"}>
      {/* Wrapper Card */}
      <Card className="mt-1">
        <CardHeader
          title={titleLabel}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          // Add Menu Button
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")}>
              <Create />
            </IconButton>
          }
        />

        {/* Table Container */}
        <TableContainer>
          <Table aria-label="menu-items-table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>

                {/* Ingredients are shown only in full table (not dashboard) */}
                {!isDashboard && <TableCell>Ingredients</TableCell>}

                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Availability
                </TableCell>

                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {menu.menuItems?.map((food) => (
                <TableRow
                  key={food.id}
                  hover
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  {/* Product Image */}
                  <TableCell>
                    <Avatar src={food.images[0]} alt={food.name} />
                  </TableCell>

                  {/* Name + Brand */}
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {food.name}
                    </Typography>
                    <Typography variant="caption">{food.brand}</Typography>
                  </TableCell>

                  {/* Ingredients Section */}
                  {!isDashboard && (
                    <TableCell>
                      {Object.keys(categorizedIngredients(food.ingredients)).map(
                        (cat) => (
                          <div key={cat}>
                            <p className="font-semibold">{cat}</p>

                            <div className="pl-5">
                              {categorizedIngredients(food.ingredients)[cat].map(
                                (ing) => (
                                  <div
                                    key={ing.id}
                                    className="flex gap-2 items-center"
                                  >
                                    <span>—</span>
                                    <span>{ing.name}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </TableCell>
                  )}

                  {/* Price */}
                  <TableCell sx={{ textAlign: "center" }}>
                    ${food.price}
                  </TableCell>

                  {/* Availability Button */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      color={food.available ? "success" : "error"}
                      onClick={() => toggleFoodAvailability(food.id)}
                    >
                      {food.available ? "In Stock" : "Out of Stock"}
                    </Button>
                  </TableCell>

                  {/* Delete Button */}
                  {!isDashboard && (
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => removeFoodItem(food.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loader Backdrop */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={menu.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MenuItemTable;
