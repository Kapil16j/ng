// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import { UserView } from '@/app/admin/views/user/view'

const User = () => {
  return (
    <Grid container spacing={6}>
      <UserView/>
      {/* <Grid item xs={12} md={6}>
        <FormLayoutsBasic />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormLayoutsIcon />
      </Grid>
      <Grid item xs={12}>
        <FormLayoutsAlignment />
      </Grid> */}
    </Grid>
  )
}

export default User
