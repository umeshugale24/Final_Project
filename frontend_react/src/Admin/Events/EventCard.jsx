import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../State/Customers/Restaurant/restaurant.action";

/**
 * EventCard Component
 *
 * → Displays a single event along with its restaurant information.
 * → If user is NOT a customer, delete option appears.
 * → Hover effect added on banner image for a smooth animation.
 */

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();

  // Handle delete event click
  const removeEvent = () => {
    dispatch(deleteEventAction(item.id));
  };

  return (
    <div>
      <Card sx={{ width: 345 }}>
        
        {/* Event Banner Image */}
        <CardMedia
          sx={{
            height: 345,
            transition: "transform 0.5s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          image={item.image} // Event image source
          title={item.name}
        />

        {/* Event Info */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.restaurant.name} {/* Restaurant Name */}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {item.name} {/* Event Name */}
          </Typography>

          <div className="py-2 space-y-2">
            <p>{item.location}</p>
            <p className="text-sm text-blue-500">{item.startedAt}</p>
            <p className="text-sm text-red-500">{item.endsAt}</p>
          </div>
        </CardContent>

        {/* Show Delete Button ONLY for Admin/Owner */}
        {!isCustomer && (
          <CardActions>
            <IconButton onClick={removeEvent} aria-label="delete-event">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
