import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

/**
 * RestaurantTable Component
 * -----------------------------------------------------
 * This table is used in Admin / SuperAdmin views
 * to display a list of restaurants. The UI supports:
 *
 * - Dashboard mode (limited rows)
 * - Full table mode (all restaurants)
 * - Basic restaurant details (banner, owner, cuisine, contact)
 *
 * NOTE: No business logic is triggered here.
 * Only UI representation of fetched restaurant data.
 */

const RestaurantTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();

  // Extract restaurant state from Redux store
  const { restaurant } = useSelector((state) => state);

  useEffect(() => {
    // Intentionally left empty (data already loaded by parent component)
  }, []);

  // Placeholder — delete logic will be implemented later
  const handleDeleteRestaurant = (restaurantId) => {
    console.log("Delete restaurant clicked →", restaurantId);
  };

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        {/* Heading of the card */}
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />

        {/* Restaurants Table */}
        <TableContainer>
          <Table aria-label="restaurant-table">
            <TableHead>
              <TableRow>
                <TableCell>Banner</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Owner</TableCell>
                <TableCell align="center">Cuisine Type</TableCell>
                <TableCell align="center">Location</TableCell>
                {!isDashboard && (
                  <TableCell align="center">Contact</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {restaurant?.restaurants
                ?.slice(0, isDashboard ? 7 : restaurant.restaurants.length)
                .map((rest) => (
                  <TableRow
                    hover
                    key={rest.id || rest.name}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    {/* Restaurant Banner */}
                    <TableCell>
                      <Avatar alt={rest.name} src={rest.imageUrl} />
                    </TableCell>

                    {/* Restaurant Name */}
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                        >
                          {rest.name}
                        </Typography>
                        <Typography variant="caption">
                          {rest.brand || ""}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Owner Name */}
                    <TableCell align="center">
                      {rest.owner?.fullName || "N/A"}
                    </TableCell>

                    {/* Cuisine */}
                    <TableCell align="center">
                      {rest.cuisineType || "Not Specified"}
                    </TableCell>

                    {/* Address */}
                    <TableCell align="center">
                      {rest.address?.city || "Unknown"}
                    </TableCell>

                    {/* Contact Info – show only when not in dashboard */}
                    {!isDashboard && (
                      <TableCell align="center">
                        {rest.contactInformation?.email || "No Email"}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default RestaurantTable;
