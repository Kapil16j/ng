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
import Form from'../../../components/Form'

import Iconify from '@/app/admin/components/iconify';
import Scrollbar from '@/app/admin/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { createOffer, createProposals, createSubscription, deleteProposals, deleteSubscription, getAllProposals, getAllSubscription, updateProposals, updateSubscription } from '@/app/admin/utils/api';
// Import updateSubscription

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

  // Individual states for each field
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [imagePreview, setImagePreview] = useState(''); // State to hold the image preview URL
  const [pdf, setPdf] = useState(null); // State to hold the selected PDF file
  const [pdfName, setPdfName] = useState('');
  const [isEditId, setIsEditId] = useState(''); // State to hold the PDF file name

  const getSubscritpion = async() => {
    try {
      
      await getAllProposals().then((item) => {
        console.log("propsalsItemsitem???", item);
        setUsers(item?.data?.result);
      });
    } catch (error) {
      console.log("error???",error)
      setUsers([])
    }

   
  };

  useEffect(() => {
    getSubscritpion();
  }, []);

  const handleOpen = () => {
    setIsEditMode(false); 
    setName('');
    setDetails('');
    setImage(null);
    setImagePreview('');
    setPdf(null);
    setPdfName('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update individual state based on the input field
    if (name === 'name') setName(value);
    if (name === 'details') setDetails(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdf(file);
      setPdfName(file.name); // Set PDF file name
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create form data to handle file upload
    const formData = new FormData();

    formData.append('name', name);
    formData.append('details', details);
    formData.append('image', image);
    formData.append('pdf', pdf);

    createProposals(formData).then((item) => {
      handleClose();
      toast.success("proposal created successfully!");
      getSubscritpion();
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    });
    } catch (error) {
      setLoading(false);
    }
 

    
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('details', details);
    formData.append('image', image);
    formData.append('pdf', pdf);

    updateProposals(formData,isEditId).then((item) => {
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
    console.log("editrow??",row)
    setName(row.name);
    setIsEditId(row.id)
    setDetails(row.details);
    setImagePreview(row.image); // Assuming image is a URL
    setIsEditMode(true);
    setOpen(true);
  };

  const handleDelete = (row) => {
 
    deleteProposals(isEditId).then(() => {
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
        <Typography variant="h4">Proposals</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          Create Proposal
        </Button>
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
                  { id: 'details', label: 'Details' },
                  { id: 'image', label: 'Image' }, // New image column
                  { id: 'pdf', label: 'PDF' }, // New PDF column
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
                    image={row.image}
                    pdf={row.pdf}

                    selected={selected.indexOf(row.name) !== -1}
                    onSelectRow={(event) => handleClick(event, row.name)}
                    handleEdit={() => handleEdit(row)} // Pass row to edit
                    setOpenConfirm={setOpenConfirm}
                    openConfirm={openConfirm}
                    setIsEditId={()=>setIsEditId(row.id)}
                    handleDelete={()=>handleDelete(row)}
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
          labelRowsPerPage="Rows per page"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataFiltered?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 1,
          }}
        >

          <Card>
            <CardHeader title={isEditMode ? "Update Proposal" : "Add Proposal"} />
            <CardContent>
              <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        name="name"
                        label="Name"
                        value={name}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        name="details"
                        label="Details"
                        value={details}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                      >
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}
                        />
                      </Button>
                      {imagePreview && (
                        <Box mt={2}>
                          <Typography variant="caption">Selected Image:</Typography>
                          <img src={imagePreview} alt="Selected" style={{ width: '50px', height: '50px' }} />
                        </Box>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                      >
                        Upload PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          hidden
                          onChange={handlePdfChange}
                        />
                      </Button>
                      {pdfName && (
                        <Box mt={2}>
                          <Typography variant="caption">Selected PDF:</Typography>
                          <Typography>{pdfName}</Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Grid>

                  <LoadingButton
                    fullWidth
                    variant="contained"
                    type="submit"
                    loading={loading}
                  >
                    {isEditMode ? 'Update Proposal' : 'Create Proposal'}
                  </LoadingButton>
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
