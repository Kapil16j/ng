'use client'

import { useRouter } from 'next/navigation';
import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AllPlans from '@/components/plans/AllPlans';
import { PlanCard } from '@/components/plans/Plans';
import Navbar from '@/components/common/Navbar';

const BuyNowPage = () => {
    const [plansData, setPlansData] = useState([])
    const [subScriptionId, setSubsciptionID] = useState('')
    const [clientSecret, setClientSecret] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    const getAllSubscriptionData = async () => {
        try {
            const response = await dispatch(getAllSubscription())
            console.log("subscriptionresponse>?", response?.data)
            if (response?.status == 200) {
                setPlansData(response?.data)
            }
        } catch (error) {
            console.error("Error fetching subscriptions data:", error);
        }
    }

    useEffect(() => {
        getAllSubscriptionData()
    }, [])



    const handleSubmit = async (subId) => {
        await router.push(`/signup?sub_id=${subId}`)
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-sky-100 to-blue-300">
                <Navbar />
                <div className=" flex flex-col items-center justify-center py-4 px-4">
                    <h2 className="text-3xl font-bold mb-4 mt-5">Join Premium Membership</h2>
                    <p className="text-lg text-gray-700 mb-8">Select a plan that fits your needs.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {plansData?.map((plan, index) => {
                            if(parseInt(plan.cost)<=0)return;
                            return (
                            <div key={index} className="w-full max-w-xs">
                                <PlanCard name={plan.name} price={plan.cost} description={plan.details} subId={plan.id} handleSubmit={handleSubmit} />
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}



export default BuyNowPage;
