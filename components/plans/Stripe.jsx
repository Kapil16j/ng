import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, PaymentElement, useElements, useStripe, ElementsConsumer } from "@stripe/react-stripe-js"




const StripeComponent = ({ clientSecret ,subScriptionId}) => {
    const [plansData, setPlansData] = useState([])
    const [showStripe, setShowStripe] = useState(false)
    // const [subScriptionId, setSubsciptionID] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null);

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



    useEffect(() => {
        const fetchPaymentIntentDetails = async () => {
            if (stripe && clientSecret) {
                try {
                    // Use Stripe's JavaScript SDK to retrieve the Payment Intent
                    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

                    console.log("paymentIntentdata????",paymentIntent)
                    if (paymentIntent) {
                        setAmount(paymentIntent?.amount / 100); // Convert amount to dollars or your currency unit
                    }
                } catch (err) {
                    setError('Failed to fetch payment details');
                }
            }
        };

        fetchPaymentIntentDetails();
    }, [stripe, clientSecret]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        if (clientSecret) {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            // const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            //     elements,
            //     confirmParams: {
            //         return_url: 'https://your-website.com/order/complete',
            //     },
            // });

            console.log("paymentIntent:", paymentIntent);

            if (stripeError) {

                console.log("stripeError??",stripeError)
                setError(stripeError.message);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
            }

        }


    };

    return (
        <>

            {/* <div className="flex justify-center items-center">
                <p className="font-bold text-[20px] mt-7">Payment</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
                <PaymentElement options={CARD_OPTIONS} className="w-full mb-4" />
                <button
                    type="submit"
                    disabled={!stripe}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Pay (${amount})
                </button>
                {error && <div className="mt-2 text-red-500">{error}</div>}
            </form> */}

            <div className='m-14'>

                <form onSubmit={handleSubmit}>
                    <CardElement options={CARD_OPTIONS} />
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10"
                    >
                        Pay
                    </button>
                    {error && <div>{error}</div>}
                </form>
            </div>


        </>
    )
}



export default StripeComponent;
