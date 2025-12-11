import React, { useEffect } from "react";
import { getAllEvents } from "../../../State/Customers/Restaurant/restaurant.action";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../../Admin/Events/EventCard";

const CustomerEvents = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  // ⬇️ My thought process:
  // Whenever the user's auth token updates, I want to refresh events.
  // This ensures customers always see the latest event list.
  useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, [auth.jwt]);

  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {/* Rendering all events visible to the customer */}
      {restaurant.events.map((event) => (
        <div key={event.id}>
          {/* Passing isCustomer flag so EventCard knows how to behave */}
          <EventCard isCustomer={true} item={event} />
        </div>
      ))}
    </div>
  );
};

export default CustomerEvents;
