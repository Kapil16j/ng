"use client";

import { useEffect, useState } from 'react';

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Box, Modal, TextField, FormControl } from '@mui/material';

import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from '@mui/lab';

// Component Imports
import Form from '../../../components/Form';

import Iconify from '@/app/admin/components/iconify';
import Scrollbar from '@/app/admin/components/scrollbar';
  
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import {  createOffer, createSubscription, deleteOffer, deleteSubscription, getAllOffers, getAllSubscription, updateOffer, updateSubscription } from '@/app/admin/utils/api';

export default function UserPage() {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditId, setIsEditId] = useState(''); // New state to track edit mode
  const [openConfirm, setOpenConfirm] = useState(false);

  // Individual states for each field
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [imagePreview, setImagePreview] = useState(''); // State to hold the image preview URL
  const [description, setDescription] = useState(null);
  const [code, setCode] = useState('');

  const getSubscritpion = async () => {
    try {

      await getAllOffers().then((item) => {
        console.log("offersitem???", item)
        setUsers(item?.data);
      })
    } catch (error) {

      setUsers([])
    }
  };

  useEffect(() => {
    getSubscritpion();
  }, []);

  const handleOpen = () => {
    setIsEditMode(false); // Reset edit mode
    setName('');
    setDetails('');
    setDuration('');
    setCost('');
    setDiscount('');
    setImage(null);
    setImagePreview('');
    setDescription('');
    setCode('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update individual state based on the input field
    if (name === 'name') setName(value);
    if (name === 'details') setDetails(value);
    if (name === 'duration') setDuration(value);
    if (name === 'cost') setCost(value);
    if (name === 'discount') setDiscount(value);
    if (name === 'description') setDescription(value);
    if (name === 'code') setCode(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Create form data to handle file upload
    // const formData = new FormData();

    // formData.append('name', name);
    // formData.append('duration', duration);
    // formData.append('discount', discount);
    // formData.append('image', image);
    // formData.append('description', description);
    // formData.append('code', code);

    const data = {
      name: name,
      duration: duration,
      discount: discount,
      image: null,
      description: description,
      code: code

    }

    createOffer(data).then((item) => {
      handleClose();
      toast.success("Offer created successfully!");
      getSubscritpion();
      setLoading(false);
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    // const formData = new FormData();

    // formData.append('name', name);
    // formData.append('duration', duration);
    // formData.append('discount', discount);
    // formData.append('image', image);
    // formData.append('description', description);
    // formData.append('code', code);

    const data = {
      name: name,
      duration: duration,
      discount: discount,
      image: null,
      description: description,
      code: code

    }

    updateOffer(data, isEditId).then((item) => {
      handleClose();
      toast.success("Offer updated successfully!");
      getSubscritpion();
      setLoading(false);
    });
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';

    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);

      setSelected(newSelecteds);

      return;
    }

    setSelected([]);
  };

  const handleEdit = (row) => {
    setName(row.name);
    setIsEditId(row.id)
    setDetails(row.details);
    setDuration(row.duration);
    setCost(row.cost);
    setDiscount(row.discount);
    setDescription(row.description);
    setCode(row.code);
    setImagePreview(row.image); // Assuming image is a URL
    setIsEditMode(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteOffer(isEditId).then(() => {
      getSubscritpion();
      setOpenConfirm(false);
    });
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Offers</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          Create Offer
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Box>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'duration', label: 'Duration' },
                  { id: 'discount', label: 'Discount' }, // New discount column
                  { id: 'image', label: 'Image' }, // New image column
                  { id: 'code', label: 'Code' }, // New code column
                  { id: 'setting', label: 'Setting' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => (
                  <UserTableRow
                    key={row?.id}
                    row={row}
                    id={row.id}
                    name={row.name}
                    details={row.details}
                    duration={row.duration}
                    cost={row.cost}
                    discount={row.discount}
                    description={row.description}
                    image={row.image}
                    code={row.code}

                    selected={selected.indexOf(row.name) !== -1}
                    onSelectRow={(event) => handleClick(event, row.name)}
                    setIsEditId={()=>setIsEditId(row.id)}
                    handleEdit={() => handleEdit(row)} // Pass row to edit
                    onDeleteRow={() => handleDelete(row.id)}
                    setOpenConfirm={setOpenConfirm}
                    openConfirm={openConfirm}
                    handleDelete={() => handleDelete(row.id)}

                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users?.length)}
                />

                {notFound && <TableNoData query={filterName} />}

              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: "15px"
        }}>
          <Card>
            <CardHeader title={isEditMode ? "Update Offer" : "Create Offer"} />
            <CardContent>

              <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Duration"
                      name="duration"
                      value={duration}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Discount"
                      name="discount"
                      value={discount}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={description}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Code"
                      name="code"
                      value={code}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleImageChange} />
                      </Button>
                      {imagePreview && (
                        <Box mt={2}>
                          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
                        </Box>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      loading={loading}
                      disabled={!name || !duration || !code} // Ensure all required fields are filled
                    >
                      {isEditMode ? 'Update Offer' : 'Create Offer'}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* </CardContent>
          </CardHeader>
          </Card> */}

        </Box>
      </Modal>

      <ToastContainer />
    </Container>
  );
}
