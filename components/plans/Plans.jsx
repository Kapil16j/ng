
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import AllPlans from './AllPlans';


// stripe

const PUBLIC_KEY = "pk_test_51LKKVJSIsqTWnddDn0QR1PpYTxsvno2w0KkGipJ4YOOvLGpmhOYXvdL2L8Q2n6owZnHAbV3gk2ula154OxzO84lR00watjCOP0"
const stripeTestPromise = loadStripe(PUBLIC_KEY)


const Plans = () => {

    return (

        <>
            <Elements stripe={stripeTestPromise}>
                <AllPlans />

            </Elements>

        </>

    )
}



export default Plans;
