// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Components Imports
// import OptionMenu from '@core/components/option-menu'
import OptionMenu from '../../@core/components/option-menu'

// Vars
const data = [
  {
    progress: 75,
    title: 'Zipcar',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/bitbank.png'
  },
  {
    progress: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/aviato.png'
  }
]

const dta = `
data
: 
grants
: 
0
offers
: 
2
prev_month_usercount
: 
4
recent_subscriptions
: 
Array(4)
0
: 
{id: 5, userId: 26, subscriptionId: 3, amount: 99, stripeEventId: 'evt_3PzcLjGUGzsXawOU004JfGUB', …}
1
: 
{id: 6, userId: 24, subscriptionId: 3, amount: 9999, stripeEventId: 'evt_3Q19t0GUGzsXawOU3uxVwIac', …}
2
: 
{id: 7, userId: 24, subscriptionId: 3, amount: 9999, stripeEventId: 'evt_3Q19ypGUGzsXawOU2LqpHAOn', …}
3
: 
{id: 4, userId: 26, subscriptionId: 3, amount: 99, stripeEventId: 'evt_3PzcKeGUGzsXawOU2DX4ymry', …}
length
: 
4
[[Prototype]]
: 
Array(0)
revenue
: 
21310.83
revenue_growth_monthly
: 
-99.99999999999999
revenue_prev_month
: 
21310.83
revenue_this_month
: 
0
sample_proposals
: 
4
subscriptions
: 
5
subscriptions_distribution
: 
Array(2)
0
: 
{subscriptionId: 3, count: 20, total_amount: 21300.840000000026}
1
: 
{subscriptionId: 13, count: 1, total_amount: 9.99}
length
: 
2
[[Prototype]]
: 
Array(0)
user_growth_monthly
: 
13
user_tiers
: 
Array(3)
0
: 
{tier: 'vip', count: 3}
1
: 
{tier: 'free', count: 11}
2
: 
{tier: 'platinum', count: 3}
length
: 
3
[[Prototype]]
: 
Array(0)
users
: 
17`

const TotalEarning = ({stats}) => {
  const earningData = stats?.recent_subscriptions
  const data = earningData?.map((item) => {
    return {
      progress: item.amount/100,
      title: item.user.name,
      amount: `$${item.amount}`,
      subtitle: item.user.email,
      imgSrc: '/images/cards/bitbank.png'
    }
  })
  
  return (
    <Card>
      <CardHeader
        title='Monthly Earning'
        action={<OptionMenu iconClassName='text-textPrimary' options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      ></CardHeader>
      <CardContent className='flex flex-col md:mbs-2.5'>
        <div className='mb-6'>
          <div className='flex items-center'>
            <Typography variant='h3'>${stats?.revenue_this_month}</Typography>
            <i className='ri-arrow-up-s-line align-bottom text-success'></i>
            <Typography component='span' color={stats?.revenue_growth_monthly > 0? "success.main":"red"}>
              {stats?.revenue_growth_monthly.toFixed(2)}%
            </Typography>
          </div>
          <Typography>Compared to ${stats?.revenue_prev_month} last month</Typography>
        </div>
        <div className='mb-3 font-bold'>Recent Subscriptions</div>
        <div className='flex flex-col gap-6 pt-1 mt-0'>
          {data && data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <Avatar src={item.imgSrc} variant='rounded' className='bg-actionHover' />
              <div className='flex justify-between items-center is-full flex-wrap gap-x-4 gap-y-2'>
                <div className='flex flex-col gap-0.5'>
                  <Typography color='text.primary' className='font-medium'>
                    {item.title}
                  </Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <Typography color='text.primary' className='font-medium'>
                    {item.amount}
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={item.progress}
                    className='is-20 bs-1'
                    color={item.color}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalEarning
