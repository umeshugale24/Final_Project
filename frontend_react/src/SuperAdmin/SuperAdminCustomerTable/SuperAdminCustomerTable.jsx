import {
  Avatar,
  Backdrop,
  Box,
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
import { getCustomers } from "../../State/SuperAdmin/superAdmin.action";

/**
 * SuperAdminCustomerTable Component
 *
 * → This table is used by *Super Admin* to view all customers registered in the system.
 * → Shows basic user details such as name, ID, email, and role.
 * → Supports a compact “dashboard preview” mode (isDashboard).
 * → Automatically fetches customer data on first load.
 */

const SuperAdminCustomerTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);

  // Fetch all customers when component mounts
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  return (
    <Box width={"100%"}>
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
          <Table aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User Role</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {superAdmin.customers
                .slice(0, isDashboard ? 7 : superAdmin.customers.length)
                .map((user) => (
                  <TableRow
                    hover
                    key={user.id}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    {/* Profile Image */}
                    <TableCell>
                      <Avatar alt={user.fullName} src={user.imageUrl} />
                    </TableCell>

                    {/* Full Name */}
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {user.fullName}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* User ID */}
                    <TableCell>{user.id}</TableCell>

                    {/* Email */}
                    <TableCell>{user.email}</TableCell>

                    {/* Role */}
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={superAdmin.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SuperAdminCustomerTable;
