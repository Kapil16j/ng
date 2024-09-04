

import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AllPlans from './AllPlans';

const Plans = () => {
    const [plansData, setPlansData] = useState([])
    const [showStripe, setShowStripe] = useState(false)
    const [subScriptionId, setSubsciptionID] = useState('')
    const [clientSecret, setClientSecret] = useState('')


    const dispatch = useDispatch()
    const getAllSubscriptionData = async () => {

        try {
            const response = await dispatch(getAllSubscription())
            console.log("subscriptionresponse>?", response)
            if (response?.status == 200) {
                setPlansData(response?.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {

        getAllSubscriptionData()

    }, [])



    const handleSubmit = async (subId) => {

        const subData = {
            "subscription_id": subId
        }
        console.log("subData??", subData)

        const response = await dispatch(createPaymentIntent(subData))

        console.log("response??", response)

        if (response?.status == 200) {


            const clientSecret = response?.data
            setClientSecret(clientSecret)
            setSubsciptionID(subId)
            setShowStripe(true)

        }


    };


    const PlanCard = ({ name, price, description, subId }) => (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-2xl font-bold mb-4">${price}</p>
            <p className="text-gray-600 mb-6">{description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => handleSubmit(subId)}
            >
                Choose Plan
            </button>
        </div>
    );

    return (

        <>

            {showStripe ?
                <AllPlans subScriptionId={subScriptionId} clientSecret={clientSecret}/>


                :
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-4 px-4">
                    <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
                    <p className="text-lg text-gray-700 mb-8">Select a plan that fits your needs.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {plansData?.map((plan, index) => (
                            <div key={index} className="w-full max-w-xs">
                                <PlanCard name={plan.name} price={plan.cost} description={plan.details} subId={plan.id} />
                            </div>
                        ))}
                    </div>
                </div>
             } 

        </>

    )
}



export default Plans;
