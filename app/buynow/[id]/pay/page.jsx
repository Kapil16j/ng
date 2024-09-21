'use client'
import { createPaymentIntent } from '@/app/store/actions/dataActions'
import AllPlans from '@/components/plans/AllPlans'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const page = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const [showStripe, setShowStripe] = useState(true)
    const [loading, setLoading] = useState(false)
    const subScriptionId = params.id;
    const clientSecret = searchParams.get('secret')

    const router = useRouter()

    if(!clientSecret){
        router.back()
    }
    const dispatch = useDispatch()

    console.log('clentsecret',clientSecret)

    return (
    <div>
        {showStripe ?
            <AllPlans subScriptionId={subScriptionId} clientSecret={clientSecret} setShowStripe={setShowStripe} />
        :
        <div className="bg-[rgb(235,235,235)] h-screen flex flex-col justify-center items-center p-6">
            Loading....
        </div>
        }
    </div>
    )
}

export default page