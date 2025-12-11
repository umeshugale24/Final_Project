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
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";

const RestaurantRequestTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { menu } = useSelector((store) => store);

  useEffect(() => {
    // This component currently doesn't fetch data here, 
    // but the hook is kept intentionally if needed in future.
  }, []);

  const handleDeleteProduct = (productId) => {
    console.log("Delete requested for product:", productId);
  };

  return (
    <Box width="100%">
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
          <Table aria-label="restaurant-items-table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {menu.menuItems
                ?.slice(0, isDashboard ? 7 : menu.menuItems.length)
                .map((item) => (
                  <TableRow
                    hover
                    key={item.name}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Avatar alt={item.name} src={item.imageUrl} />
                    </TableCell>

                    <TableCell sx={{ py: 1 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="caption">{item.brand}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.category?.name}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      ${item.price}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.quantity ?? 10}
                    </TableCell>

                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          variant="text"
                          onClick={() => handleDeleteProduct(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default RestaurantRequestTable;
