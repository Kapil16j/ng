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
import { Box, Modal, TextField, FormControl, Switch, Select, MenuItem, InputLabel } from '@mui/material';

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
 // Import updateSubscription
  
import {  createSubscription, deleteSubscription, getAllSubscription, updateSubscription } from '@/app/admin/utils/api';
// ----------------------------------------------------------------------

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
  const [isEditMode, setIsEditMode] = useState(false); // New state to track edit mode
  const [openConfirm, setOpenConfirm] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    details: '',
    duration: '',
    cost: '',
    tier: '',
    public : false,
  });

  const getSubscritpion = async () => {
    await getAllSubscription().then((item) => {
      console.log("subscriptionitems???", item);
      setUsers(item?.data);
    });
  };

  useEffect(() => {
    getSubscritpion();
  }, []);

  const handleOpen = () => {
    setIsEditMode(false); // Reset edit mode
    setNewUser({ name: '', details: '', duration: '', cost: '', tier:'', public: false }); // Reset form fields
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChangePublic = (e) => {
    const ischecked = e.target.checked;
    console.log("ischecked", ischecked);
    setNewUser((prev) => ({ ...prev, public: ischecked }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("new Subscription ::::", newUser);
    await createSubscription(newUser).then((item) => {
      setLoading(false);
      handleClose();
      console.log("CreateSubsription Response : : :", item)
      toast.success("Subscription created successfully!");
      getSubscritpion();
    });
    setLoading(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubscription(newUser).then((item) => {
      handleClose();
      toast.success("Subscription updated successfully!");
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
    if (event.target?.checked) {
      const newSelecteds = users.map((n) => n.name);

      setSelected(newSelecteds);

      return;
    }

    setSelected([]);
  };

  const handleEdit = (row) => {
    setNewUser(row); // Set form fields with the values from the row
    setIsEditMode(true); // Enable edit mode
    setOpen(true); // Open the modal
  };

  const handleDelete = (id) =>{
    
    deleteSubscription(id).then(()=>{
      getSubscritpion()
      setOpenConfirm(false);
    })
 
   
  }

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
        <Typography variant="h4">Subscriptions</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          Add Subscription
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
                  { id: 'details', label: 'Detail' },
                  { id: 'duration', label: 'Duration' },
                  { id: 'cost', label: 'Cost' },
                  { id: 'tier', label: 'Tier' },
                  { id: 'public', label: 'Public' },
                  { id: 'setting', label: 'Setting' },
                ]}
              />
              <TableBody>
                {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={row?.id}
                      name={row?.name}
                      details={row?.details}
                      duration={row?.duration}
                      cost={row?.cost}
                      tier={row?.tier}
                      ispublic={row?.public}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      id={row.id}
                      getSubscritpion={getSubscritpion}
                      handleEdit={() => handleEdit(row)}
                      handleDelete={()=>handleDelete(row.id)}
                      openConfirm={openConfirm}
                      setOpenConfirm={setOpenConfirm}
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
          page={page}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal open={open} onClose={handleClose}>
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
            <CardHeader title={isEditMode ? "Update Subscription" : "Add Subscription"} />
            <CardContent>
              <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Name"
                        name="name"
                        value={newUser.name}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Detail"
                        name="details"
                        value={newUser.details}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Duration"
                        name="duration"
                        value={newUser.duration}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Cost"
                        name="cost"
                        type="number"
                        value={newUser.cost}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Tier</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name='tier'
                        value={newUser.tier}
                        label="Select Tier"
                        onChange={handleInputChange}
                      >
                        <MenuItem value='free'>Free</MenuItem>
                        <MenuItem value='vip'>VIP</MenuItem>
                        <MenuItem value='platinum'>Platinum</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <div className='flex items-center justify-between'>
                        <label>Is it Public ? </label>
                        <Switch
                          checked={newUser.public}
                          onChange={handleInputChangePublic}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={loading}
                    >
                      {isEditMode ? "Update" : "Submit"}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <ToastContainer />
    </Container>
  );
}
