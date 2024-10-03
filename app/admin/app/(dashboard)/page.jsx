'use client'

import Grid from '@mui/material/Grid'

// Components Imports
import Award from '../../views/dashboard/Award'
import Transactions from '../../views/dashboard/Transactions'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'
import TotalEarning from '../../views/dashboard/TotalEarning'
import LineChart from '../../views/dashboard/LineChart'
import DistributedColumnChart from '../../views/dashboard/DistributedColumnChart'
import DepositWithdraw from '../../views/dashboard/DepositWithdraw'
import SalesByCountries from '../../views/dashboard/SalesByCountries'
import CardStatVertical from '../../components/card-statistics/Vertical'
import Table from '../../views/dashboard/Table'
import { useEffect, useState } from 'react'
import { getAdminStats } from '../../utils/api'
import SubscriptionWiseRevenue from '../../views/dashboard/SubscriptionWiseRevenue'

const DashboardAnalytics = () => {
  const [stats, setStats] = useState(null)


  useEffect(() => {
    getAdminStats().then((item)=>{
      console.log("Stats : ",item)
      setStats(item?.data)
    })
  }, [])
  
  return (
    <Grid container spacing={6}>
      
      <Grid item xs={12} md={12} lg={12}>
        <Transactions stats={stats} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <WeeklyOverview stats={stats} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SubscriptionWiseRevenue stats={stats} />
      </Grid>
      
      <Grid item xs={12} md={6} lg={4}>
        <Grid item spacing={2}>
          <Grid item marginY={2}>
            <CardStatVertical
              title='Weekly Revenue'
              stats={"$"+stats?.prev_week_revenue}
              avatarIcon='ri-pie-chart-2-line'
              avatarColor='secondary'
              subtitle={'Compared to previous week $' + stats?.prev_prev_week_revenue } 
              trendNumber={stats?.prev_week_revenue - stats?.prev_prev_week_revenue}
              trend={stats?.prev_week_revenue - stats?.prev_prev_week_revenue > 0 ?'positive':'negative'}
            />
          </Grid>
          <Grid item marginY={2}>
            <CardStatVertical
              stats={ stats?.support_forms - stats?.resolved_support_forms + "/" +stats?.support_forms}
              trend='negative'
              trendNumber={ ((stats?.support_forms - stats?.resolved_support_forms)*100/stats?.support_forms).toFixed(2) + "%"}
              title='Unresolved Supports'
              subtitle={"Total " + stats?.resolved_support_forms + "/" +stats?.support_forms + " Supports are Resolved"}
              avatarColor='primary'
              avatarIcon='ri-file-word-2-line'
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <DistributedColumnChart stats={stats} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LineChart />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TotalEarning stats={stats} />
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        <SalesByCountries />
      </Grid> */}
      {/* <Grid item xs={12} lg={8}>
        <DepositWithdraw />
      </Grid> */}

    </Grid>
  )
}

export default DashboardAnalytics
