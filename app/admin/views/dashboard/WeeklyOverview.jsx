'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Components Imports

// import OptionMenu from '../../@core/components/option-menu'


// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('../../libs/styles/AppReactApexCharts'))

const WeeklyOverview = ({stats}) => {
  
  const userTiers = stats?.user_tiers


  // Prepare data for the chart
  const series = userTiers?.map(tier => tier.count)
  const labels = userTiers?.map(tier => tier.tier)

  // Chart options
  
  const options2 = {
    chart: {
      type: 'pie'
    },
    labels: labels? labels : [],
    colors: ['#FF4560', '#008FFB', '#00E396'], // Array of colors for each tier
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    fill: {
      opacity: 1 // Ensure the pie slices are fully opaque
    },
    stroke: {
      show: true,
      width: 2, // Border width between slices
      colors: ['#fff'] // Border color between slices
    },
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return `${val} users`
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='User Tier Distribution'
        // action={<OptionsMenu iconClassName='text-textPrimary' options={['Refresh', 'Update', 'Delete']} />}
        
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <AppReactApexCharts
          boxProps={{ width: '100%'}}
          options={options2}
          series={series? series: []}
          type='pie'
        />
        <div className='flex items-center mbe-4 gap-4'>
          <Typography variant='h4'>45%</Typography>
          <Typography>Your sales performance is 45% 😎 better compared to last month</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
