//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports

import OptionMenu from '../../@core/components/option-menu'
import CustomAvatar from '../../@core/components/mui/Avatar'

// Vars
const data = [
  {
    stats: '245k',
    title: 'Sales',
    color: 'primary',
    icon: 'ri-pie-chart-2-line'
  },
  {
    stats: '12.5k',
    title: 'Users',
    color: 'success',
    icon: 'ri-group-line'
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Products',
    icon: 'ri-macbook-line'
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Revenue',
    icon: 'ri-money-dollar-circle-line'
  }
]

const Transactions = ({stats}) => {
  return (
    <Card className='bs-full'>
      <CardHeader
        title='Transactions'
        action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Share', 'Update']} />}
        subheader={
          <p className='mbs-3'>
            <span className='font-medium text-textPrimary'>Total {stats?.user_growth_monthly} Users 😎 </span>
            <span className='text-textSecondary'>Joined this month</span>
          </p>
        }
      />
      <CardContent className='!pbs-5'>
        <Grid container spacing={2}>
            <Grid item xs={6} md={3} >
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color="primary" className='shadow-xs'>
                  <i className="ri-pie-chart-2-line"></i>
                </CustomAvatar>
                <div>
                  <Typography>{"Sales"}</Typography>
                  <Typography variant='h5'>{stats?.subscriptions}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={3} >
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color='success' className='shadow-xs'>
                  <i className="ri-group-line"></i>
                </CustomAvatar>
                <div>
                  <Typography>{"Users"}</Typography>
                  <Typography variant='h5'>{stats?.users}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={3} >
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color='warning' className='shadow-xs'>
                  <i className="ri-macbook-line"></i>
                </CustomAvatar>
                <div>
                  <Typography>{"Proposals"}</Typography>
                  <Typography variant='h5'>{stats?.sample_proposals}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={3} >
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color='info' className='shadow-xs'>
                  <i className="ri-money-dollar-circle-line"></i>
                </CustomAvatar>
                <div>
                  <Typography>{"Revenue"}</Typography>
                  <Typography variant='h5'>${stats?.revenue}</Typography>
                </div>
              </div>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Transactions
