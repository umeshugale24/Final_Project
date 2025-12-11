import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../State/Admin/Order/restaurants.order.action";

// Order status options shown inside the dropdown
const ORDER_STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrdersTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Redux store slice for restaurant orders
  const { restaurantsOrder } = useSelector((store) => store);

  // Used to open dropdown menus independently for each row
  const [menuAnchorList, setMenuAnchorList] = useState([]);

  /**
   * Opens the action menu for a specific table row.
   */
  const handleMenuOpen = (event, index) => {
    const updatedAnchors = [...menuAnchorList];
    updatedAnchors[index] = event.currentTarget;
    setMenuAnchorList(updatedAnchors);
  };

  /**
   * Closes the dropdown menu for a specific row.
   */
  const handleMenuClose = (index) => {
    const updatedAnchors = [...menuAnchorList];
    updatedAnchors[index] = null;
    setMenuAnchorList(updatedAnchors);
  };

  /**
   * Updates order status by dispatching the redux action.
   */
  const handleStatusUpdate = (orderId, newStatus, index) => {
    handleMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />

        <TableContainer>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Delivery Address</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Name</TableCell>
                {!isDashboard && <TableCell>Ingredients</TableCell>}
                {!isDashboard && <TableCell>Status</TableCell>}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {restaurantsOrder.orders
                ?.slice(0, isDashboard ? 7 : restaurantsOrder.orders.length)
                .map((order, rowIndex) => (
                  <TableRow
                    hover
                    key={order.id}
                    className="cursor-pointer"
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    {/* Order ID */}
                    <TableCell>{order.id}</TableCell>

                    {/* Images of all items inside the order */}
                    <TableCell>
                      <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                        {order.items.map((item) => (
                          <Avatar
                            key={item.food.id}
                            alt={item.food.name}
                            src={item.food.images[0]}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    {/* Customer email */}
                    <TableCell>{order.customer.email}</TableCell>

                    {/* Delivery Address */}
                    <TableCell>
                      <div className="space-y-1">
                        <p>{order.deliveryAddress?.streetAddress}</p>
                        <p>
                          {order.deliveryAddress?.city},{" "}
                          {order.deliveryAddress?.state}
                        </p>
                        <p>{order.deliveryAddress?.postalCode}</p>
                        <p>{order.deliveryAddress?.country}</p>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>${order.totalAmount}</TableCell>

                    {/* Food names */}
                    <TableCell>
                      {order.items.map((itm) => (
                        <p key={itm.food.id}>{itm.food.name}</p>
                      ))}
                    </TableCell>

                    {/* Ingredients list */}
                    {!isDashboard && (
                      <TableCell>
                        {order.items.map((itm) => (
                          <div className="flex gap-1 flex-wrap" key={itm.food.id}>
                            {itm.ingredients?.map((ing, idx) => (
                              <Chip key={idx} label={ing} />
                            ))}
                          </div>
                        ))}
                      </TableCell>
                    )}

                    {/* Status Chip */}
                    {!isDashboard && (
                      <TableCell>
                        <Chip
                          label={order.orderStatus}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            color: "white !important",
                          }}
                          color={
                            order.orderStatus === "PENDING"
                              ? "info"
                              : order.orderStatus === "DELIVERED"
                              ? "success"
                              : "secondary"
                          }
                        />
                      </TableCell>
                    )}

                    {/* Update Status Dropdown */}
                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          onClick={(event) =>
                            handleMenuOpen(event, rowIndex)
                          }
                        >
                          Status
                        </Button>

                        <Menu
                          anchorEl={menuAnchorList[rowIndex]}
                          open={Boolean(menuAnchorList[rowIndex])}
                          onClose={() => handleMenuClose(rowIndex)}
                        >
                          {ORDER_STATUS_OPTIONS.map((opt) => (
                            <MenuItem
                              key={opt.value}
                              onClick={() =>
                                handleStatusUpdate(
                                  order.id,
                                  opt.value,
                                  rowIndex
                                )
                              }
                            >
                              {opt.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading Overlay */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={restaurantsOrder.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;
