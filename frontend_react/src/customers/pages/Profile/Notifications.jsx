import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
import { Card } from "@mui/material";

const Notifications = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  // When the user lands on the notifications page, I trigger an API call
  // to load all notifications tied to the logged-in user.
  useEffect(() => {
    dispatch(getUsersNotificationAction());
  }, []);

  return (
    <div className="space-y-5 px-5 lg:px-20">
      <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>

      {/* If there are no notifications at all, I display a simple message */}
      {order.notifications?.length === 0 && (
        <p className="text-center text-gray-500">No notifications yet</p>
      )}

      {/* Sorting ensures newest notifications appear first.
         I am also limiting the view to the 5 latest notifications 
         to make the UI feel clean. */}
      {order.notifications
        ?.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
        .slice(0, 5)
        .map((item) => (
          <Card key={item.id || item.sentAt} className="p-5">
            <p>{item.message}</p>
          </Card>
        ))}
    </div>
  );
};

export default Notifications;
