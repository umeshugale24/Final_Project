import React, { useEffect } from "react";
import OrderCard from "../../components/Order/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../../State/Customers/Orders/Action";

const Orders = () => {
  const { order, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // 👉 When user logs in or JWT updates, I fetch all orders for that specific user
  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

  // 👉 Sorting orders latest → oldest for a better UX
  const sortedOrders = [...order.orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>

      <div className="space-y-5 w-full lg:w-1/2">
        {/* 👉 Looping through each order and then each item inside that order */}
        {sortedOrders.map((singleOrder) =>
          singleOrder.items.map((item) => (
            <OrderCard
              key={item.id} // helps React identify list items
              status={singleOrder.orderStatus}
              order={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
