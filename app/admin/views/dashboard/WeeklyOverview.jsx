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
  let maxIndex = undefined

  // Prepare data for the chart
  const series = userTiers?.map(tier => tier.count)
  const labels = userTiers?.map(tier => tier.tier)

  function findMaxIndex(arr) {
    let maxIndex = 0
    let maxValue = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i]
        maxIndex = i
      }
    }
    return maxIndex
  }

  if(stats){
    maxIndex = findMaxIndex(series)
  }

  // Chart options
  
  const options2 = {
    chart: {
      type: 'pie'
    },
    labels: labels? labels : [],
    colors: ['#FF4560', '#008FFB', '#00E396'], // Array of colors for each tier
    responsive: [
      {
        breakpoint: 900, // Example for medium screens
        options: {
          chart: {
            width: '100%', 
            height: '450px', // Adjust height for medium screens
          },
          legend: {
            position: 'right',
            height: '50px',
          },
        },
      },
      {
        breakpoint: 1400, // Example for medium screens
        options: {
          chart: {
            width: '100%', 
            height: '450px', // Adjust height for medium screens
          },
          legend: {
            position: 'bottom',
            height: '50px',
          },
        },
      },
      {
        breakpoint: 480, // For smaller screens
        options: {
          chart: {
            width: '100%',
            height: '450px', // Adjust height further for small screens
          },
          legend: {
            position: 'bottom',
            height: '50px',
          },
        },
      },
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
          boxProps={{ width: '100%', minHeight: '100px'}}
          options={options2}
          series={series? series: []}
          type='pie'
        />
        {stats && 
          <div className='flex items-center mbe-4 gap-4'>
            {/* <Typography >{stats.users} Users</Typography> */}
            <div>
            {series.map((item, index) => (
              <span key={index}><b>{item}/{stats.users}</b> users are in {labels[index]} tier. </span>
            ))}
            </div>
            
          </div>
        }
        
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
