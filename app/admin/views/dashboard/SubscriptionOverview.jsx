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

const AppReactApexCharts = dynamic(() => import('../../libs/styles/AppReactApexCharts'))


const SubscriptionsDistributionChart = () => {
  // Subscriptions Distribution Data
  const subscriptionsDistribution = [
    { subscriptionId: 3, count: 20, total_amount: 21300.840000000026 },
    { subscriptionId: 13, count: 1, total_amount: 1200.0 } // Sample data for total_amount
  ]

  // Prepare data for the chart
  const subscriptionIds = subscriptionsDistribution.map(sub => `ID: ${sub.subscriptionId}`)
  const counts = subscriptionsDistribution.map(sub => sub.count)
  const totalAmounts = subscriptionsDistribution.map(sub => sub.total_amount)

  // Chart options for a stacked bar chart
  const options = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true, // Set to true for stacked bars
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to false for vertical orientation
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#008FFB', '#FF4560'], // Colors for the bars
    xaxis: {
      categories: subscriptionIds,
      title: {
        text: 'Subscription ID',
      },
    },
    yaxis: {
      title: {
        text: 'Count / Total Amount',
      },
      labels: {
        formatter: (value) => value.toLocaleString(), // Format the y-axis labels
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => value.toLocaleString(),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: true,
    },
  }

  const series = [
    {
      name: 'Count',
      data: counts,
    },
    {
      name: 'Total Amount',
      data: totalAmounts,
    },
  ]

  return (
    <AppReactApexCharts
      boxProps={{ width: '100%', height: 400 }}
      options={options}
      series={series}
      type='bar'
    />
  )
}

export default SubscriptionsDistributionChart