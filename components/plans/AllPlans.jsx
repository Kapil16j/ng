import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useElements, useStripe, ElementsConsumer } from "@stripe/react-stripe-js"




const AllPlans = () => {
const [plansData,setPlansData] = useState([])

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()


    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "black",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" },


            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"

            }
        }
    }



    const handleSubmit = async (subId) => {

        alert("okk")
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),

        })
        if (error) {
            alert('Enter Card Detail Or Invalid card detail')
        } else {
            console.log("paymentMethod", paymentMethod)
            console.log("error", error)
            console.log("paymentmethodID", paymentMethod.id)

            if (!error) {
                try {
                    const { id } = paymentMethod
                    // const id = paymentMethod.id same as above line

                    const subdata= {
                        "subscription_id":subId
                    }
                    const response = await dispatch(createPaymentIntent(subdata))  

                    console.log("response????",response)
                    if (response.status == 200) {
                        console.log("Successful payment")
                        console.log('res', response)


                        // confirm payment method 
                        console.log(response.data.clientSecret)
                        const confirmPayment = await stripe.confirmCardPayment(response.data.clientSecret, {
                            payment_method: paymentMethod.id
                        })
                        console.log("confirm", confirmPayment)
                       

                    }

                } catch (error) {
                    console.log("Error", error)
                }
            } else {
                console.log(error.message)
            }


        }
    }


    const getAllSubscriptionData = async () => {

        try {
            const response = await dispatch(getAllSubscription())
            console.log("subscriptionresponse>?", response)
            if(response?.status == 200){
                setPlansData(response?.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {

        getAllSubscriptionData()

    }, [])


    const PlanCard = ({ name, price, description,subId }) => (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-2xl font-bold mb-4">${price}</p>
            <p className="text-gray-600 mb-6">{description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={()=>handleSubmit(subId)}
            >
                Choose Plan
            </button>
        </div>
    );
    


    return (
        <>
       
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-4 px-4">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-700 mb-8">Select a plan that fits your needs.</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {plansData?.map((plan, index) => (
                    <div key={index} className="w-full max-w-xs">
                        <PlanCard name={plan.name} price={plan.cost} description={plan.details} subId={plan.id}/>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}



export default AllPlans;
