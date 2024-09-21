'use client'

import AllPlans from '@/components/plans/AllPlans';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const page = ({id}) => {
    const searchParams = useSearchParams();
    const [showStripe, setShowStripe] = useState(true)
    const [loading, setLoading] = useState(false)
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
                <AllPlans subScriptionId={id} clientSecret={clientSecret} setShowStripe={setShowStripe} />
            :
            <div className="bg-[rgb(235,235,235)] h-screen flex flex-col justify-center items-center p-6">
                Loading....
            </div>
            }
        </div>
    )
}

export default page