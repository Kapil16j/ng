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
import { Box, Modal, TextField, FormControl, CardHeader, CardContent, Grid, Select, MenuItem, InputLabel, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Iconify from '@/app/admin/components/iconify';
import Scrollbar from '@/app/admin/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { activateDeactivateUser, BulkUsersCreate, getAllSubscription, getAllUser, updateSubscriptionId, updateTier, updateUser } from '@/app/admin/utils/api';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([])
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false)
  const [bulkopen, setBulkOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditId, setIsEditId] = useState('');
  const [tierValue, setTierValue] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email:"",
    phoneNo: '',
    country: '',

  });

  const [bulkUsers, setBulkUsers] = useState({
    subscriptionId: -1,
    duration : 1,
    users : [{
      name: '',
      email:'',
      phoneNo: '',
      country: '',
    }]
  })


  const getUsers = () => {
    getAllUser().then((item) => {
      setUsers(item?.data)
    })
  }
  const getSubscritpion = () => {
    getAllSubscription().then((item) => {
      console.log("subscriptionitem???", item);
      setSubscriptions(item?.data);
    });
  };

  useEffect(() => {
    getUsers();
    getSubscritpion();
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenBulk = () => setBulkOpen(true);
  const handleCloseBulk = () => setBulkOpen(false);

  const handleBulkInputChange = (e, index) =>{
    const { name, value } = e.target;
    const updatedUsers = [...bulkUsers.users];
    updatedUsers[index][name] = value;
    setBulkUsers((prev) => ({ ...prev, users: updatedUsers }));
  }
  const addNewUserToBulk = () => {
    setBulkUsers((prev) => ({
      ...prev,
      users: [...prev.users, { name: '', email: '', phoneNo: '', country: '' }],
    }));
  };
  const removeUserFromBulk = (index) => {
    const updatedUsers = [...bulkUsers.users];
    updatedUsers.splice(index, 1);
    setBulkUsers((prev) => ({ ...prev, users: updatedUsers }));
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await BulkUsersCreate(bulkUsers);
      console.log('Bulk create successful:', response.data);
      toast.success("Bulk create successfully!");
      handleCloseBulk();
      getUsers();
      setLoading(false);
    } catch (error) {
      console.error('Error during bulk create:', error);
      toast.error("Error during bulk create!");
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await userCreate(data);
    getUsers();
    setLoading(false);
    handleClose();
    toast.success("User created successfully!");
  };

  // Other handlers like handleSort, handleSelectAllClick, etc.


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);


    console.log("newUser??",newUser)
    const data = {
      name: newUser.name,
      email:newUser.email,
      phoneNo: newUser.phoneNo,
      country: newUser.country,
    }
    await updateUser(data,isEditId).then((item) => {
     
      toast.success("User updated successfully!");
      handleClose();
      getUsers();
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


  // const handleStatusChange = (event) => {
  //   // Update the status in your state or make an API call to update the status
  //   setChecked(event.target.checked);
  // };

  const handleStatusChange = async (id, currentStatus) => {
    try {


      // Toggle the boolean status
      const newStatus = !currentStatus;

      // Update the status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isAccountLocked: newStatus } : user
        )
      );

      console.log("newStatus??", newStatus,id);

      const data = {
        id: id,
        value: newStatus ? 'activate' : 'deactivate',  // API expects 'activate' or 'deactivate'
      };

      // Call the API to update the status
      await activateDeactivateUser(data).then((item) => {
        console.log("activeitem???", item);
        getUsers();
      });

    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };


  const handleTierChange = async (id, currentStatus) => {
    try {


      // Toggle the boolean status
      const newStatus = currentStatus;

      // Update the status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, tier: newStatus } : user
        )
      );

      console.log("newStatustier??", newStatus,id);
      const data = {
        tier: newStatus,
      };

      // Call the API to update the status
      await updateTier(data,id).then((item) => {
        getUsers();
      });
      

    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleSubscriptionChange = async (id, newStatus) => {
    try {
      const data = {
        subscriptionId: newStatus==-1?null:newStatus
      };
      await updateUser(data, id).then((item) => {
        getUsers();
      })
    } catch (error) {
      console.error("Error updating user status:", error);
    }
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

  const handleEdit = (row) => {
    setNewUser(row); // Set form fields with the values from the row
    setIsEditId(row.id)
    setIsEditMode(true); // Enable edit mode
    setOpen(true); // Open the modal
  };




  const notFound = !dataFiltered?.length && !!filterName;

  



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <div className='flex gap-2'>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            New User
          </Button>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenBulk}>
            Bulk Add Users
          </Button>
        </div>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
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
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'isAccountLocked', label: 'Account Locked' },
                  { id: 'isEmailVerified', label: 'Email Verified' },
                  { id: 'subscription', label: 'Subscription' },
                  { id: 'tier', label: 'Tier' },
                  { id: 'createdAt', label: 'created Date' },
                  { id: 'status', label: 'A/D User' },
                  { id: 'setting', label: 'Setting' },
                ]}
              />
              <TableBody>
                {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={row?.id}
                      name={row?.name}
                      email={row?.email}
                      role={row?.role}
                      accountLocked={row?.isAccountLocked}
                      isEmailVerified={row?.isEmailVerified}
                      subscription={row?.subscription}
                      allsubscriptions={subscriptions}
                      tier={row?.tier}
                      status={row?.status}
                      createdAt={row?.createdAt}
                      updatedAt={row?.updatedAt}
                      
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleEdit={() => handleEdit(row)}
                      onStatusChange={() => handleStatusChange(row.id, row.isAccountLocked)}
                      id={row.id}
                      checked={checked}
                      handleTierChange={(event) => handleTierChange(row.id, event.target.value)}
                      handleSubscriptionChange={(event) => handleSubscriptionChange(row.id, parseInt(event.target.value))}
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
        </Scrollbar>

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
            <CardHeader title={isEditMode ? "Update User" : "Add User"} />
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
                        label="Email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Phone"
                        name="phoneNo"
                        value={newUser.phoneNo}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Country"
                        name="country"
                       
                        value={newUser.country}
                        onChange={handleInputChange}
                      />
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

      <Modal open={bulkopen} onClose={handleCloseBulk}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: "15px",
          overflowY: scroll,
        }}>
          <Card>
            <CardHeader title={"Add users in bulk."} />
            <CardContent>
              <form onSubmit={handleBulkSubmit}>
                <div className='flex gap-4 mb-4'>
                  <Grid item >
                    <FormControl >
                    <InputLabel id="subscription-select-label">Subscription</InputLabel>
                      <Select
                        value={bulkUsers.subscriptionId}
                        labelId='subscription-select-label'
                        label='subscription'
                        className=' min-w-[150px]'
                        onChange={(event) => setBulkUsers({ ...bulkUsers, subscriptionId: event.target.value })}
                      >
                        <MenuItem value={-1}>None</MenuItem>
                        {subscriptions?.map((subscription) => (
                          <MenuItem value={subscription?.id}>{subscription?.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        label="Duration"
                        name="duration"
                        type="number"
                        value={bulkUsers.duration}
                        onChange={e=>setBulkUsers({...bulkUsers, duration: e.target.value})}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Month</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={addNewUserToBulk}>+ Add User</Button>
                  </Grid>
                </div>
                {bulkUsers.users.map((user, index) => (
                  <div key={index} className='flex  gap-4 mb-4'>
                    <Grid item xs={5}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Name"
                          name="name"
                          value={user.name}
                          onChange={e => handleBulkInputChange(e, index)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Email"
                          name="email"
                          value={user.email}
                          onChange={e => handleBulkInputChange(e, index)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Phone"
                          name="phoneNo"
                          value={user.phoneNo}
                          onChange={e => handleBulkInputChange(e, index)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Country"
                          name="country"
                          value={user.country}
                          onChange={e => handleBulkInputChange(e, index)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removeUserFromBulk(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </div>
                ))}
                <Grid container spacing={3}>
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
