  import React from "react";
import Image from "next/image";
import { AppStoreIcon, GooglePlayIcon } from "../common/Icon";

const Access = () => {
  return (
    <>
      <div className="max-2xl:px-6 pt-9 md:pt-20 lg:pt-[127px]">
        <div className="max-w-[1280px] lg:h-[610px] md:pb-[128px] sm:pb-[70px] pb-[40px]  w-full mx-auto max-lg:flex-col-reverse justify-between max-lg:items-center max-lg:justify-end items-end xl:gap-[46px] lg:gap-[16px] flex xl:px-[80px] md:px-[40px] px-[25px] mt-16 md:mt-20 lg:mt-32 bg-unity rounded-[8px]">
          <div className="max-w-[281px] sm:max-w-[542px] w-full  max-lg:-mt-10">
            <h1 className="font-interTight lg:text-[48px] sm:text-[32px] text-[22px] max-lg:text-center font-bold md:leading-[120%] leading-normal text-whiteSmoke ">
              Access your premium membership on your mobile app
            </h1>
            <p className="max-w-[506px] w-full mt-4 font-interTight lg:text-[18px]  max-lg:text-center text-[15px] font-normal md:leading-[140%] text-whiteSmoke leading-normal ">
              Your Premium Membership is in your hands. You can download and
              access it on your Android or iOS Mobile.
            </p>

                        <div className='flex gap-4 pt-4 sm:pt-10'>
                            <button type='submit' className=' hover:scale-90  duration-500 '><span><GooglePlayIcon /></span></button>
                            <button type="submit" className=' hover:scale-90  duration-500 '><span><AppStoreIcon /></span></button>
                        </div>
                    </div>
                    <div className=' md:max-w-[524px] md:w-full  flex items-center justify-center lg:translate-y-[6%] -translate-y-[20%] '>
                        <Image className=' shadow-2xl shadow-[lightgray,0px_0px_100%_100%] max-sm:w-[129px] max-sm:h-[262px]' src="/assets/img/Phone.png" width={318} height={642} alt='img'/>
                    </div>
                </div>
           </div>
        </>
    )
}

export default Access;
