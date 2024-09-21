'use client'

import Signup from '@/components/sign-up/SignupForBuyNow'
import { LoadingButton } from '@mui/lab'
import { Box, FormControl, Grid, TextField } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const {id} = useParams()
    
    return (
      <div className='p-3'>
        <Signup id={id}/>
      </div>
    )
}

export default page