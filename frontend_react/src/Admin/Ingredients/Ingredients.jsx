import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import { useState } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStockOfIngredient,
} from "../../State/Admin/Ingredients/Action";

// Modal styling configuration
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Ingredients = () => {
  const dispatch = useDispatch();

  // Global state extraction
  const { restaurant, ingredients, auth } = useSelector((store) => store);

  // JWT token retrieval
  const jwtToken = localStorage.getItem("jwt");

  // Manage modal for ingredient creation
  const [showIngredientModal, setShowIngredientModal] = useState(false);

  // Manage modal for ingredient category creation
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Opens ingredient creation modal
  const openIngredientModal = () => setShowIngredientModal(true);
  const closeIngredientModal = () => setShowIngredientModal(false);

  // Opens category creation modal
  const openCategoryModal = () => setShowCategoryModal(true);
  const closeCategoryModal = () => setShowCategoryModal(false);

  /**
   * Handles toggling ingredient stock availability
   * Calls Redux action → updates DB + UI state
   */
  const updateIngredientStock = (ingredientId) => {
    dispatch(updateStockOfIngredient({ id: ingredientId, jwt: jwtToken }));
  };

  return (
    <div className="px-2">
      <Grid container spacing={1}>
        {/* MAIN INGREDIENT TABLE */}
        <Grid item xs={12} lg={8}>
          <Card className="mt-1">
            <CardHeader
              title={"Ingredients"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={openIngredientModal}>
                  <Create />
                </IconButton>
              }
            />

            {/* Scrollable ingredients list */}
            <TableContainer className="h-[88vh] overflow-y-scroll">
              <Table aria-label="ingredients-table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {ingredients.ingredients.map((ingredient) => (
                    <TableRow
                      key={ingredient.id}
                      hover
                      className="cursor-pointer"
                      sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                    >
                      <TableCell>{ingredient.id}</TableCell>

                      <TableCell>{ingredient.name}</TableCell>

                      <TableCell>{ingredient.category.name}</TableCell>

                      <TableCell>
                        {/* Toggle availability button */}
                        <Button
                          onClick={() => updateIngredientStock(ingredient.id)}
                          color={ingredient.inStoke ? "success" : "primary"}
                        >
                          {ingredient.inStoke ? "in stock" : "out of stock"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* INGREDIENT CATEGORY TABLE */}
        <Grid item xs={12} lg={4}>
          <Card className="mt-1">
            <CardHeader
              title={"Category"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={openCategoryModal}>
                  <Create />
                </IconButton>
              }
            />

            <TableContainer>
              <Table aria-label="category-table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {ingredients.category?.map((cat) => (
                    <TableRow key={cat.id} hover>
                      <TableCell>{cat.id}</TableCell>
                      <TableCell>{cat.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* INGREDIENT FORM MODAL */}
      <Modal open={showIngredientModal} onClose={closeIngredientModal}>
        <Box sx={modalStyle}>
          <CreateIngredientForm handleClose={closeIngredientModal} />
        </Box>
      </Modal>

      {/* INGREDIENT CATEGORY FORM MODAL */}
      <Modal open={showCategoryModal} onClose={closeCategoryModal}>
        <Box sx={modalStyle}>
          <CreateIngredientCategoryForm handleClose={closeCategoryModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default Ingredients;
