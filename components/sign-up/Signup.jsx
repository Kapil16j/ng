"use client";
import React, { useEffect, useState } from "react";
import {
  EyeoffIcon,
  EyeonIcon,
  FormarrowIcon,
  GoogleIcon,
} from "../common/Icon";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getSubscriptionById, register, registerWithSubscription } from "@/app/store/actions/dataActions";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const Signup = ({sub_id}) => {
  const [passwordeye, setPasswordeye] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptinoInfo , setSubscriptionInfo] = useState(null);


  const dispatch = useDispatch();
  const router = useRouter()

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  console.log("SUB_ID", sub_id)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value.length < 8);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    // setCountryError(!validateEmail(event.target.value));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    // setCountryError(!validateEmail(event.target.value));
  };

  

  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
    setTermsError(!event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const isValidEmail = validateEmail(email);
    const isValidPassword = password.length >= 8;
    const isValidName = name.trim() !== "";
    const isValidTerms = termsChecked;

    // Set errors
    setEmailError(!isValidEmail);
    setPasswordError(!isValidPassword);
    setTermsError(!isValidTerms);

    if (!isValidEmail || !isValidName || !isValidTerms) {
      return;
    }

    // Dispatch registration action
    setLoading(true)
    const data = {
      name: name,
      email: email,
      country: country,
      phone:phone
    };

    dispatch(register({ data })).then((data) => {
      setLoading(false)
      if (data?.status == 201) {
        // toast.success("Registered Successfully");
      
        router.push('/signin')
      } else if (data?.response?.status == 400) {
        toast.error(data?.response?.data?.detail);
      }
    });
  };

  const handleSubmitwithSubscription = (e) => {
    e.preventDefault();

    // Validate fields
    const isValidEmail = validateEmail(email);
    const isValidPassword = password.length >= 8;
    const isValidName = name.trim() !== "";
    const isValidTerms = termsChecked;

    // Set errors
    setEmailError(!isValidEmail);
    setPasswordError(!isValidPassword);
    setTermsError(!isValidTerms);

    if (!isValidEmail || !isValidName || !isValidTerms) {
      return;
    }

    // Dispatch registration action
    setLoading(true)
    const data = {
      name: name,
      email: email,
      country: country,
      phone:phone
    };

    dispatch(registerWithSubscription({ data, sub_id })).then((data) => {
      console.log("DATA : ", data)
      if (data.user) {
        // toast.success("Registered Successfully");

        const accesstoken = data?.user?.access_token
        const secret = data?.secret
        Cookies.set('accesstoken', accesstoken, { expires: 10 })
        if(secret)
          router.push(`/signup/pay/${sub_id}?secret=${secret}`)
        else 
          toast.error("Couldn't create Payment Intent. Please try Again later!")

        setLoading(false)
        
      } else if (data?.response?.status == 400) {
        toast.error(data?.response?.data?.detail);
      }
    });
  }

  async function getSubscriptionInfo(id){
    const response = await dispatch(getSubscriptionById(id))
    console.log("Plan Info : ", response.data)
    setSubscriptionInfo(response.data)
  }

  useEffect(() =>{
    if(sub_id){
      getSubscriptionInfo(sub_id)
    }
  }, [])

  return (
    <div className="w-full flex sm:h-screen">
      {loading && (
        <Loader/>
      )}
      <div className="w-full lg:w-[51.5%] overflow-auto sm:max-lg:bg-[url(/assets/img/login-bg.png)] bg-cover bg-no-repeat bg-center sm:bg-white flex py-10 sm:pt-[81px] max-lg:items-center 2xl:items-center justify-center p-4">
        <div className="lg:max-w-[436px] max-w-[636px] h-fit max-lg:overflow-auto sm:max-lg:shadow-[0px_0px_112px_0px_rgba(0,0,0,0.09),0px_0px_18px_0px_rgba(0,0,0,0.12)_inset] rounded-md max-lg:p-8 max-sm:px-3 max-sm:py-6 bg-white w-full">
          <h2 className="text-zinc-800 text-2xl sm:text-5xl font-bold font-interTight leading-[120%] ">
            Create an Account
          </h2>
          <p className="text-[#828282]  font-interTight text-[16px] sm:text-[22px] font-light">
            Kindly fill in your details to create an account
          </p>
          <form className="w-full flex gap-5 flex-col mt-2 xl:mt-[49px]" onSubmit={sub_id? handleSubmitwithSubscription :handleSubmit}>
            <div className="flex flex-col gap-1 sm:gap-[10px] ">
              <label
                htmlFor="text"
                className="text-[#333] font-interTight text-[16px] sm:text-[18px] font-normal leading-[140%]"
              >
                Your Full Name*
              </label>
              <input
                type="text"
                id="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`sm:py-[22px] py-2 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${!name.trim() ? "border-red-500" : ""
                  }`}
              />
              {!name.trim() && (
                <p className="text-red-500">Please enter your name.</p>
              )}
            </div>
            <div className="flex flex-col gap-1 sm:gap-[10px] ">
              <label
                htmlFor="email"
                className={`text-[#333] font-interTight  text-[16px] sm:text-[18px] font-normal leading-[140%] `}
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                className={`sm:py-[22px] py-2 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${emailError ? "border-red-500" : ""
                  }`}
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 sm:gap-[10px] ">
              <label
                htmlFor="email"
                className={`text-[#333] font-interTight  text-[16px] sm:text-[18px] font-normal leading-[140%] `}
              >
                Country*
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter email address"
                className={`sm:py-[22px] py-2 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${emailError ? "border-red-500" : ""
                  }`}
                value={country}
                onChange={handleCountryChange}
                required
              />
              {countryError && (
                <p className="text-red-500">
                  Please enter a Valid Country.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 sm:gap-[10px] ">
              <label
                htmlFor="email"
                className={`text-[#333] font-interTight  text-[16px] sm:text-[18px] font-normal leading-[140%] `}
              >
                Phone*
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter email address"
                className={`sm:py-[22px] py-2 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${emailError ? "border-red-500" : ""
                  }`}
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {phoneError && (
                <p className="text-red-500">
                  Please enter a Valid Phone.
                </p>
              )}
            </div>
            {/* <div className="flex flex-col gap-1 sm:gap-[10px] relative">
              <span
                className={`absolute  cursor-pointer right-5 ${passwordError
                  ? " bottom-[62px] sm:bottom-14"
                  : "sm:bottom-6 bottom-2.5"
                  }`}
                onClick={() => setPasswordeye(!passwordeye)}
              >
                {passwordeye ? <EyeoffIcon /> : <EyeonIcon />}
              </span>
              <label
                htmlFor="password"
                className="text-[#333] font-interTight text-[16px] sm:text-[18px] font-normal leading-[140%]"
              >
                Create Password*
              </label>
              <input
                type={passwordeye ? "password" : "text"}
                id="password"
                placeholder="Create a password"
                className={`sm:py-[22px] py-2 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${passwordError ? "border-red-500" : ""
                  }`}
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-500">
                  Password must be at least 8 characters long.
                </p>
              )}
            </div> */}
            <div className="flex gap-2 sm:gap-4 items-center">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={termsChecked}
                onChange={handleTermsChange}
              />
              <label
                htmlFor="agree"
                className="text-[#4F4F4F] font-interTight text-[18px] font-normal leading-[140%]"
              >
                I agree to terms & conditions
              </label>
            </div>
            {termsError && (
              <p className="text-red-500">Please agree to the terms and conditions.</p>
            )}
            <button
              type="submit"
              className="w-full text-white font-interTight text-[16px] font-medium h-[48px] sm:h-[64px] rounded flex items-center justify-center gap-3 border border-[#1D2130] duration-300 group hover:text-[#1D2130] hover:bg-transparent bg-[#1D2130]"
            >
              Sign Up <FormarrowIcon />
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-[#828282] font-interTight text-[16px]">
              Already a User?{" "}
              <button onClick={()=>router.push("/signin")} className="text-blue-500 hover:underline">
                Sign in
              </button>
            </span>
          </div>
          <div className="w-full my-4 sm:my-[29px]  flex gap-[30px] items-center ">
            <div className="w-full  h-[1px] bg-[#E0E0E0]"></div>
            <p className="text-[#BDBDBD] font-interTight text-[18px] font-normal leading-[140%]">
              Or
            </p>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
          </div>
          <Link href="/signin">
            <button
              type="submit"
              className="w-full px-[32px] text-white font-interTight text-[16px] font-medium h-[48px] sm:h-[64px] rounded flex items-center justify-start gap-3 border border-[#1D2130] duration-300 group hover:text-[#1D2130] hover:bg-transparent bg-[#1D2130]"
            >
              <GoogleIcon /> Register with Google
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[48.5%] max-lg:hidden bg-[url(/assets/img/login-bg.png)] bg-cover bg-no-repeat bg-center  flex items-center justify-center p-4">
        {subscriptinoInfo && <>
            <div>
              <div className="bg-white shadow-md rounded-lg p-6 ">
                  <div className="text-center text-2xl mb-3">Your Order Summary</div>
                  <div className=" text-center">
                      <p className="text-3xl font-extrabold mb-4 text-green-600"> $ {subscriptinoInfo.cost} <span className="text-sm font-light text-gray-500">/ month</span></p>
                      <span className="bg-blue-100 text-blue-700  text-white font-bold py-2 px-4 rounded border mb-4">Billed Monthly</span>
                  </div>
                  <div className="py-4">
                      {subscriptinoInfo.details?.split(',').map((item, index) => {
                          return (
                              <div className='flex flex-col' key={index}>
                                  <div className='flex flex-row gap-2'>
                                      <img src="/assets/img/checkMark.png" className='w-4 h-4 mt-1'></img>
                                      <p className="text-gray-600">{item}</p>
                                  </div>
                              </div>
                          )
                      })}
                  </div>
                  <div className="text-xs text-opacity-50 text-gray-700 flex justify-center">
                    <div>* Payments are processed using secure, <br /> PCI- compliant payment processors. <br />We do not store your complete card details.</div>
                  </div>
              </div>
            </div>
        </>}
      </div>
    </div>
  );
};

export default Signup;
