import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Create } from '@mui/icons-material';
import CreateCategory from './CreateCategory';

/* Modal styling used for the popup form */
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Category = () => {

  /* ----------- Redux Setup ----------- */
  const dispatch = useDispatch();

  // Extracting required slices from Redux store
  const { auth, restaurant } = useSelector((store) => store);

  // JWT token (if needed later for API calls)
  const jwtToken = localStorage.getItem("jwt");

  /* ----------- Local State for Modal ----------- */
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  /* 
     NOTE:
     - useEffect is empty here, meaning this component does not fetch categories.
     - It assumes categories are already fetched elsewhere (e.g., at login or admin dashboard load).
  */

  return (
    <div>
      {/* ---------- CARD: Displays all existing categories ---------- */}
      <Card className="mt-1">

        <CardHeader
          title={"Categories"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          /* Button to open modal to create a new category */
          action={
            <IconButton onClick={handleOpenModal}>
              <Create />
            </IconButton>
          }
        />

        {/* ---------- TABLE: Category List ---------- */}
        <TableContainer>
          <Table aria-label="categories table">

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Loop through category list */}
              {restaurant.categories.map((categoryItem) => (
                <TableRow
                  key={categoryItem.id}
                  hover
                  className="cursor-pointer"
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>{categoryItem?.id}</TableCell>

                  <TableCell>
                    {categoryItem.name}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>

      {/* ---------- MODAL: Create Category Form ---------- */}
      <Modal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-category-modal"
        aria-describedby="modal-for-creating-new-category"
      >
        <Box sx={modalStyle}>
          {/* Passing close handler to child component */}
          <CreateCategory handleClose={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default Category;
