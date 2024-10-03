import { useState } from 'react';

import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from '../../components/iconify';
import { getUserById } from '../../utils/api';
import { ContentCopy } from '@mui/icons-material';

export default function UserTableRow({
  selected,
  avatarUrl,
  phone,
  handleClick,
  handleEdit,
  handleDelete,
  id,
  user,
  userId,
  amount,
  stripeEventId,
  stripeWebhookEventId,
  subscriptionId,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [newUser, setNewUser] = useState(null);

  const handleOpenConfirm = async () => {
    const user = await getUserById(userId)
    console.log("user is : : : ",user);
    setNewUser(user?.data);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar className='size-5' alt={userId} src={avatarUrl} />
            <div>
              <Typography>{user?.name}</Typography>
              <Typography>{user?.email}</Typography>
            </div>
          </Stack>
        </TableCell>
        
        <TableCell>${amount}</TableCell>
        <TableCell>{stripeEventId}</TableCell>
        <TableCell>{stripeWebhookEventId}</TableCell>
        <TableCell>{ subscriptionId}</TableCell>

        <TableCell align="right">
          <button className='bg-slate-500 text-white py-1 px-2 rounded-lg' onClick={handleOpenConfirm}>
            {/* <Iconify icon="eva:more-vertical-fill" /> */}
            <div>Show User</div>
          </button>
        </TableCell>
      </TableRow>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>User Details </DialogTitle>
        <DialogContent className='min-w-[350px]'>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Name : </span> <div><span>{newUser?.name}</span> <button onClick={()=>navigator.clipboard.writeText(newUser?.name)}><ContentCopy /></button></div></Typography>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Email : </span> <div><span>{newUser?.email}</span> <button onClick={()=>navigator.clipboard.writeText(newUser?.email)}><ContentCopy /></button></div></Typography>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Phone : </span> <div><span>{newUser?.phoneNo}</span> <button onClick={()=>navigator.clipboard.writeText(newUser?.phoneNo)}><ContentCopy /></button></div></Typography>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Country : </span> <span>{newUser?.country}</span></Typography>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Tier : </span> <span>{newUser?.tier}</span></Typography>
          <Typography className='flex justify-between'><span className='font-bold text-black'>Role : </span> <span>{newUser?.role}</span></Typography>
          <Typography ><span className='font-bold text-black'>Subscription : </span> 
            <div className='pl-3 flex flex-col items-end'>
              <div><span>name : </span> <span>{newUser?.subscription.name}</span></div>
              <div><span>cost : </span> <span>$ {newUser?.subscription.cost}</span></div>
              <div><span>duration : </span> <span>{newUser?.subscription.duration} Month</span></div>
            </div>
          </Typography>
          <Typography><span className='font-bold text-black'>IsAccountLocked : </span> <span>{newUser?.isAccountLocked ?"True":"False"}</span></Typography>
          <Typography><span className='font-bold text-black'>isEmailVerified : </span> <span>{newUser?.isEmailVerified ?"True":"False"}</span></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>OK</Button>
          {/* <Button onClick={handleDelete} color="error">
            Delete
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  role: PropTypes.string,
  subscription: PropTypes.string,
  avatarUrl: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string,
};
