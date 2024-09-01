// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import { UserView } from '@/app/admin/views/transaction/view'

const User = () => {
  return (
    <Grid container spacing={6}>
      <UserView/>
    </Grid>
  )
}
  
export default User
