"use client";
import React, { useState } from "react";
import {
  EyeoffIcon,
  EyeonIcon,
  FormarrowIcon,
  GoogleIcon,
} from "../common/Icon";
import { logIn, verifyOtp } from "@/app/store/actions/dataActions"; // Assuming you have a verifyOtp action
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import Cookies from 'js-cookie'
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";

const Signin = () => {
  const [passwordeye, setPasswordeye] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(""); // State to store the OTP
  const [otpVisible, setOtpVisible] = useState(false); // State to control OTP screen visibility
  const [OTP, setOTP] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value.length < 8);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
    setTermsError(!event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);

    setEmailError(!isValidEmail);
    setTermsError(!termsChecked);

    if (!isValidEmail || !termsChecked) {
      return;
    }

    setLoading(true);

    const data = {
      email: email,
    };

    dispatch(logIn({ data })).then((response) => {
      console.log("loginData??", response);
      setLoading(false);
      if (response?.status === 201 || response?.status === 200) {
        setOtpVisible(true); // Show OTP screen on successful login
      } else if (response?.response?.status) {
        toast.error(response?.response?.data?.detail);
      }
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      otp:OTP
    };

    dispatch(verifyOtp({data })).then((response) => {
      setLoading(false);
    

      if (response?.status == 200) {
        console.log("otpdata??", response)
        const accesstoken = response?.data?.access_token
        const refreshToken = response?.data?.refresh_token

        Cookies.set('accesstoken', accesstoken, { expires: 5/1440 });
        Cookies.set('refreshtoken', refreshToken, { expires: 7 });

        if(["ADMIN", "SUPERADMIN", "EDITOR"].includes(response?.data?.user_type)){
          router.push('/admin/app')
        }

        if(response?.data?.user_type == "USER"){
          router.push('/dashboard/home')
        }
        // router.push('/admin/app')
        //  router.push('/dashboard/home')
      // "  /dashobard/home"

      } else {
        toast.error(response?.response?.data?.detail)
      }
    });
  };

  const inputStyle = {
    width: "3rem",
    height: "3rem",
    margin: "0 0.5rem",
    fontSize: "1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    textAlign: "center",
  };

  return (
    <div className="w-full flex sm:h-screen">
      {loading && <Loader />}
      <div className="w-full lg:w-[51.5%] overflow-auto sm:max-lg:bg-[url(/assets/img/login-bg.png)] bg-cover bg-no-repeat bg-center sm:bg-white flex max-lg:py-20 max-sm:py-10 items-center justify-center p-4">
        <div className="lg:max-w-[436px] max-w-[636px] h-fit max-lg:overflow-auto sm:max-lg:shadow-[0px_0px_112px_0px_rgba(0,0,0,0.09),0px_0px_18px_0px_rgba(0,0,0,0.12)_inset] rounded-md max-lg:p-8 max-sm:px-3 max-sm:py-6 bg-white w-full">
          <h2 className="text-zinc-800 text-2xl lg:text-4xl xl:text-5xl font-bold font-interTight leading-[120%]">
            Sign In
          </h2>
          <p className="text-[#828282] mt-2 font-interTight text-[16px] sm:text-[22px] font-light">
            We are happy to have you back
          </p>
          
          {otpVisible ? (
            <form className="w-full flex gap-5 flex-col mt-3 xl:mt-[49px]" onSubmit={handleOtpSubmit}>
              <div className="flex flex-col gap-1 sm:gap-[10px]">
                <label
                  htmlFor="otp"
                  className="text-[#333] font-interTight text-[16px] sm:text-[18px] font-normal leading-[140%]"
                >
                  Enter OTP
                </label>

                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} inputStyles={inputStyle} secure />
                {/* <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  className="xl:py-[22px] py-3 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0]"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                /> */}
              </div>
              <button
                type="submit"
                className="w-full text-white font-interTight text-[16px] font-medium h-[48px] xl:h-[64px] rounded flex items-center justify-center gap-3 border border-[#1D2130] duration-300 group hover:text-[#1D2130] hover:bg-transparent bg-[#1D2130]"
              >
                Verify OTP <FormarrowIcon />
              </button>
            </form>
          ) : (
            <form className="w-full flex gap-5 flex-col mt-3 xl:mt-[49px]" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 sm:gap-[10px]">
                <label
                  htmlFor="email"
                  className="text-[#333] font-interTight text-[16px] sm:text-[18px] font-normal leading-[140%]"
                >
                  Email Address
                </label>

               
      
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  className={`xl:py-[22px] py-3 text-[#828282] text-[16px] sm:text-[18px] px-2 sm:px-[24px] bg-[#F2F2F2] outline-none border rounded border-[#E0E0E0] ${emailError ? "border-red-500" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-500">Please enter a valid email address.</p>
                )}
              </div>
             
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
                className="w-full text-white font-interTight text-[16px] font-medium h-[48px] xl:h-[64px] rounded flex items-center justify-center gap-3 border border-[#1D2130] duration-300 group hover:text-[#1D2130] hover:bg-transparent bg-[#1D2130]"
              >
                Sign In <FormarrowIcon />
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <span className="text-[#828282] font-interTight text-[16px]">
              Don&apos;t have an account?
              <button onClick={()=>router.push("/signup")} className="text-blue-500 hover:underline">
                Sign up
              </button>
            </span>
          </div>
          <div className="w-full my-4 xl:my-[29px] flex gap-[30px] items-center">
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            <p className="text-[#BDBDBD] font-interTight text-[18px] font-normal leading-[140%]">
              Or
            </p>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
          </div>
          <button
            type="submit"
            className="w-full px-[32px] text-white font-interTight text-[16px] font-medium h-[48px] xl:h-[64px] rounded flex items-center justify-start gap-3 border border-[#1D2130] duration-300 group hover:text-[#1D2130] hover:bg-transparent bg-[#1D2130]"
          >
            <GoogleIcon /> Register with Google
          </button>
          
        </div>
      </div>
      <div className="w-[48.5%] max-lg:hidden bg-[url(/assets/img/login-bg.png)] bg-cover bg-no-repeat bg-center flex items-center justify-center p-4"></div>
    </div>
  );
};

export default Signin;
