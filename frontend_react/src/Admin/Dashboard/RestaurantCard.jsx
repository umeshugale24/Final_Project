import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteRestaurant,
  updateRestaurantStatus,
} from "../../State/Customers/Restaurant/restaurant.action";

/**
 * RestaurantCard Component
 * -------------------------------------
 * Displays a single restaurant card with:
 *  - Banner Image
 *  - Restaurant Name
 *  - Options: Delete, Open/Close, Dashboard button
 * 
 * Props:
 *  - info: restaurant object containing { id, name, imageUrl, open }
 */

const RestaurantCard = ({ item: info }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Handle deleting a restaurant */
  const handleDelete = () => {
    dispatch(deleteRestaurant(info.id));
  };

  /** Toggle restaurant open/close status */
  const toggleStatus = () => {
    dispatch(updateRestaurantStatus(info.id));
  };

  /** Navigate to restaurant admin dashboard */
  const goToDashboard = () => {
    navigate(`/admin/restaurants/${info.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1rem" }}>
      {/* Card Header with icon + title */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#e91e63", color: "#fff" }}>
            {info.name?.charAt(0).toUpperCase() || "R"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={info.name}
        subheader="Restaurant Info"
      />

      {/* Restaurant Image */}
      <img
        src={info.imageUrl}
        alt="restaurant"
        className="h-[17rem] w-full object-cover"
      />

      {/* Description - static text */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Explore and manage this restaurant’s details, menu, and status.
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions>
        <div className="flex w-full items-center justify-between">

          {/* Delete Restaurant */}
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>

          {/* Open / Close Button */}
          <Button
            color={info.open ? "warning" : "success"}
            onClick={toggleStatus}
          >
            {info.open ? "Close" : "Open"}
          </Button>

          {/* Dashboard Button */}
          <Button size="small" onClick={goToDashboard}>
            Dashboard
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
