'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton';


// Component Imports
import Cookies from 'js-cookie'

import Illustrations from '../components/Illustrations'

// Config Imports

import themeConfig from '../configs/themeConfig'

// Hook Imports

import { useImageVariant } from '../@core/hooks/useImageVariant'

import {login, verifyOtp } from '../utils/api'

const Login = ({ mode }) => {
  // States
  const [step, setStep] = useState(1) // To manage the step in the login process
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  // Validation function
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    
return regex.test(email)
  }

  const handleEmailChange = e => {
    const value = e.target.value

    setEmail(value)
    setEmailError(!validateEmail(value))
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    if (!emailError && email) {
      // Placeholder: Make API call to send OTP to the email here
      setLoading(true)

      const data = {
        email: email
      }

      await login(data).then((item) => {
        console.log("logindata??", item)

        if (item?.status == 200) {
          setStep(2)
         
        } else {
          alert(item?.response?.data?.detail)
        }

        setLoading(false)

      })


    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    // Placeholder: Make API call to verify OTP here
    setLoading(true)

    const data = {
      email: email,
      otp: otp
    }

    await verifyOtp(data).then((item) => {

      if (item?.status == 200) {
        console.log("otpdata??", item)
        const accesstoken = item?.data?.access_token
        const refreshToken = item?.data?.refresh_token

        Cookies.set('accesstoken', accesstoken, { expires: 7 })
        router.push('/admin/app')

      } else {
        alert(item?.response?.data?.detail)
      }

      setLoading(false)
    })

  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! Admin👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
            </div>
            {step === 1 && (
              <form noValidate autoComplete='off' onSubmit={handleEmailSubmit} className='flex flex-col gap-5'>
                <TextField
                  autoFocus
                  fullWidth
                  label='Email'
                  value={email}
                  type="email"
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? 'Please enter a valid email address' : ''}
                />
                {/* <Button fullWidth variant='contained' type='submit' >
                  Login
                </Button> */}
                <LoadingButton loading={loading} variant="contained" type='submit' disabled={emailError || !email}>
                  Login
                </LoadingButton>

              </form>
            )}
            {step === 2 && (
              <form noValidate autoComplete='off' onSubmit={handleOtpSubmit} className='flex flex-col gap-5'>
                <TextField
                  autoFocus
                  fullWidth
                  label='OTP'
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
            
                <LoadingButton fullWidth loading={loading} variant="contained" type='submit' >
                Verify OTP
                </LoadingButton>

              </form>
            )}
            {/* <Divider className='gap-3'>or</Divider> */}
            {/* <div className='flex justify-center items-center gap-2'>
              <IconButton size='small' className='text-facebook'>
                <i className='ri-facebook-fill' />
              </IconButton>
              <IconButton size='small' className='text-twitter'>
                <i className='ri-twitter-fill' />
              </IconButton>
              <IconButton size='small' className='text-github'>
                <i className='ri-github-fill' />
              </IconButton>
              <IconButton size='small' className='text-googlePlus'>
                <i className='ri-google-fill' />
              </IconButton>
            </div> */}
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  )
}

export default Login
