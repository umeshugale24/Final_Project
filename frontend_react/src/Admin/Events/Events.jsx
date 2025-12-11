/**
 * Events Component
 * -----------------
 * Handles:
 * - Fetching all events for the logged-in restaurant owner
 * - Displaying event cards
 * - Creating new event (using modal form)
 */

import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createEventAction,
  getRestaurnatsEvents,
} from "../../State/Customers/Restaurant/restaurant.action";

import { useParams } from "react-router-dom";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import EventCard from "./EventCard";

/** Modal style for centered popup */
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

/** Initial form values for creating an event */
const emptyForm = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);

  /** Track modal state (open/close) */
  const [openModal, setOpenModal] = useState(false);

  /** Track form values for new event creation */
  const [eventForm, setEventForm] = useState(emptyForm);

  /** Local JWT fallback */
  const jwt = localStorage.getItem("jwt");

  /** Open modal */
  const openCreateModal = () => setOpenModal(true);

  /** Close modal */
  const closeCreateModal = () => setOpenModal(false);

  /** Handle regular input updates */
  const handleTextChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  /** Handle date-time picker updates */
  const updateDateField = (dateValue, fieldName) => {
    const formatted = dayjs(dateValue).format("MMMM DD, YYYY hh:mm A");
    setEventForm({ ...eventForm, [fieldName]: formatted });
  };

  /** Submit event form */
  const submitNewEvent = (e) => {
    e.preventDefault();

    dispatch(
      createEventAction({
        data: eventForm,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );

    console.log("Event Created:", eventForm);

    // Optional: Reset & close modal
    // setEventForm(emptyForm);
    // closeCreateModal();
  };

  /** Fetch all events once restaurant data is available */
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
      {/* Create Event Button */}
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={openCreateModal}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      {/* Event Cards Section */}
      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((eventItem) => (
          <EventCard key={eventItem.id} item={eventItem} />
        ))}
      </div>

      {/* Create Event Modal */}
      <Modal open={openModal} onClose={closeCreateModal}>
        <Box sx={modalStyle}>
          <form onSubmit={submitNewEvent}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  fullWidth
                  value={eventForm.image}
                  onChange={handleTextChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  fullWidth
                  value={eventForm.location}
                  onChange={handleTextChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  fullWidth
                  value={eventForm.name}
                  onChange={handleTextChange}
                />
              </Grid>

              <Grid item xs={12}>
                {/* Start Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date & Time"
                    value={eventForm.startedAt}
                    onChange={(val) => updateDateField(val, "startedAt")}
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                {/* End Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date & Time"
                    value={eventForm.endsAt}
                    onChange={(val) => updateDateField(val, "endsAt")}
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
