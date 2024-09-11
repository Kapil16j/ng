import { createPaymentIntent, getAllSubscription } from '@/app/store/actions/dataActions';
import React, { useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import StripeComponent from './Stripe';


const PUBLIC_KEY = "pk_test_5191lJuGUGzsXawOUeNe6qhVa9INf8wSwo1wnNz6OrzqS9qzu9YkCy5xcjb0M36i6NKaULllJmaIowbEJi0VVHglJ00dF5YwOuH"



// pk_test_51Ju8LMSJE9ZIErMkwwFpZhk3RzxzWhtjVS6L7tJLTB17GSF3FTo5BR9jXc5oQz8fYItydr7Xtj7JjwaYvU6SyE3p00H1Vig9Tl
// pk_test_5191lJuGUGzsXawOUeNe6qhVa9INf8wSwo1wnNz6OrzqS9qzu9YkCy5xcjb0M36i6NKaULllJmaIowbEJi0VVHglJ00dF5YwOuH
console.log("PUBLIC_KEY???", PUBLIC_KEY)
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const AllPlans = ({subScriptionId, clientSecret,setShowStripe}) => {
   
    console.log("subScriptionId>??",subScriptionId,clientSecret)

    return (
        <>

{/* <Elements stripe={stripeTestPromise} > */}
             <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
                <StripeComponent clientSecret={clientSecret} subScriptionId={subScriptionId} setShowStripe={setShowStripe}/>

            </Elements>
        </>
    )
}



export default AllPlans;
