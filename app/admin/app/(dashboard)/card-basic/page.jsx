// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Components Imports
import CardInfluencingInfluencerWithImg from '@/app/admin/views/card-basic/CardInfluencingInfluencerWithImg'
import CardUser from '@/app/admin/views/card-basic/CardUser'
import CardWithCollapse from '@/app/admin/views/card-basic/CardWithCollapse'
import CardMobile from '@/app/admin/views/card-basic/CardMobile'
import CardHorizontalRatings from '@/app/admin/views/card-basic/CardHorizontalRatings'
import CardWatch from '@/app/admin/views/card-basic/CardWatch'
import CardLifetimeMembership from '@/app/admin/views/card-basic/CardLifetimeMembership'
import CardInfluencingInfluencer from '@/app/admin/views/card-basic/CardInfluencingInfluencer'
import CardVerticalRatings from '@/app/admin/views/card-basic/CardVerticalRatings'
import CardSupport from '@/app/admin/views/card-basic/CardSupport'
import CardWithTabs from '@/app/admin/views/card-basic/CardWithTabs'
import CardWithTabsCenter from '@/app/admin/views/card-basic/CardWithTabsCenter'
import CardTwitter from '@/app/admin/views/card-basic/CardTwitter'
import CardFacebook from '@/app/admin/views/card-basic/CardFacebook'
import CardLinkedIn from '@/app/admin/views/card-basic/CardLinkedIn'

const CardBasic = () => {
  return (  
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>Basic Cards</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencerWithImg />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardHorizontalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWatch />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardLifetimeMembership />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3'>Navigation Cards</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardWithTabs />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardWithTabsCenter />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3'>Solid Cards</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardTwitter />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardFacebook />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardLinkedIn />
      </Grid>
    </Grid>
  )
}

export default CardBasic
