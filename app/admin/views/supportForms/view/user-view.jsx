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

import Form from '../../../components/Form';

import Iconify from '@/app/admin/components/iconify';
import Scrollbar from '@/app/admin/components/scrollbar';
  
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getAllSupportForms,getAllUser, supportFormsResolved } from '@/app/admin/utils/api';

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

  const [open,setOpen] = useState(false)

  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    subscription: '',
  });


  const getallForms = () =>{
    getAllSupportForms().then((item)=>{
      console.log("supportitem???",item)
      setUsers(item?.data?.data)
    })
  }

  useEffect(()=>{

    getallForms()

  },[])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = Date.now().toString(); // Generate a unique ID for the new user

    setUsers((prevUsers) => [...prevUsers, { ...newUser, _id: newUserId }]);
    handleClose();
    toast.success("User created successfully!");
  };

  // Other handlers like handleSort, handleSelectAllClick, etc.


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


  const handleStatusChange = async (id, currentStatus) => {
    try {
      // Toggle the boolean status
      const newStatus = !currentStatus;
  
      // Update the status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, resolved: newStatus } : user
        )
      );
  
      console.log("newStatus??", newStatus);
  
      const data = {
        id: id,
        value: 'resolved'  // API expects 'activate' or 'deactivate'
      };
  
      // Call the API to update the status
      await supportFormsResolved(data).then((item) => {
        console.log("resloveactiveitem???", item);
        getallForms();
      });
  
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Support Forms</Typography>
        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          New User
        </Button> */}
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
                  { id: 'description', label: 'Description' },
                  { id: 'subject', label: 'Subject' },
                  { id: 'resolved', label: 'Resolved' },
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
                      description={row?.description}
                      subject={row?.subject}
                      resolved={row?.resolved}

                      
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onStatusChange={() => handleStatusChange(row.id, row.resolved)}
                      id={row._id}
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
          p: 4,
        }}>
          <Typography variant="h6" mb={2}>Create New User</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Phone"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Subscription"
                name="subscription"
                value={newUser.subscription}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Stack direction="row" justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </Container>
  );
}
