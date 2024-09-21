

import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import AllPlans from './AllPlans';


export const PlanCard = ({ name, price, description, subId }) => (
    <>
        <div className="bg-white shadow-md rounded-lg p-6 ">
            <div className=" text-center">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-2xl font-bold mb-4"> {price} /-</p>
            </div>
            <div>
                {description?.split(',').map((item, index) => {
                    return (
                        <div className='flex flex-col' key={index}>
                            <div className='flex flex-row gap-2'>
                                <img src="/assets/img/checkMark.png" className='w-4 h-4 mt-1'></img>
                                <p className="text-gray-600">{item}</p>
                            </div>
                        </div>
                    )
                })}

                <div className=" text-center">
                    {price > 0 ?
                        <button className="bg-[#002b42] text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
                            onClick={() => handleSubmit(subId)}
                        >
                            Upgrade Plus
                        </button>

                        :
                        <>
                            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                               
                            >
                                Your Current Plan
                            </button> */}
                        </>
                    }
                </div>
            </div>
        </div>
    </>
);

const Plans = ({ setSelectedComponent }) => {
    const [plansData, setPlansData] = useState([])
    const [showStripe, setShowStripe] = useState(false)
    const [subScriptionId, setSubsciptionID] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()
    const getAllSubscriptionData = async () => {

        try {
            setLoading(true)
            const response = await dispatch(getAllSubscription())
            console.log("subscriptionresponse>?", response)
            if (response?.status == 200) {
                setPlansData(response?.data)
                setLoading(false)
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


    return (

        <>
            {loading ?
                 <div className="bg-[rgb(0,43,66)] h-screen flex flex-col justify-center items-center p-6">
                    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center', }}>
                    <CircularProgress sx={{ color:'white' }}/>
                    </Box>
                </div>

                :

                <>
                    {showStripe ?
                        <AllPlans subScriptionId={subScriptionId} clientSecret={clientSecret} setShowStripe={setShowStripe} />


                        :
                        <div className="bg-[rgb(0,43,66)] h-screen flex flex-col justify-center items-center p-6">
                            <div className=" flex flex-col items-center justify-center py-4 px-4">
                                <h2 className="text-3xl font-bold mb-4 text-white">Choose Your Plan</h2>
                                <p className="text-lg  mb-8 text-white">Select a plan that fits your needs.</p>
                                <div className="flex flex-col md:flex-row justify-center gap-8">
                                    {plansData?.map((plan, index) => (
                                        <div key={index} className="w-full max-w-xs">
                                            <PlanCard name={plan.name} price={plan.cost} description={plan.details} subId={plan.id} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>

    )
}



export default Plans;
