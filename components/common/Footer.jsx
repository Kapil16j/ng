"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppStoreIcon1, FacebookIcon, GooglePlayIconFooter, InstagramIcon, TwitterIcon, YoutubeIcon } from './Icon';

const Footer = () => {
  return (
  <>  
  <div className="bg-coarseWool w-full md:pt-[59px] pt-[32px] sm:pb-[60px] pb-[60px] px-6 2xl:px-0 mt-[76PX] md:mt-[120px] lg:mt-[200px] xl:mt-[232px]">
  <div className="max-w-[1280px] w-full mx-auto">
    <div className="flex sm:gap-5 gap-[18px] max-lg:flex-col justify-between">
      <div className="max-w-[363px] w-full text-floralWhite font-interTight text-xs leading-[160%] font-normal">
        <p>
          All Rights Reserved ©  LLC. No part of this web
          site may be copied or stored in a data file in any manner or
          form, be it electronic, digital, mechanical, manual,
          photographic or in any other way without the prior written
          consent of  LLC. except where expressly allowed.
        </p>
        <p>
          Disclaimer: Unless otherwise specified, this website is not
          affiliated to any of the organizations mentioned above in any
          manner. The material provided here is solely for informational
          purposes only without any warranty. Visitors are advised to use
          it at their own discretion. Read our Full Terms of Service
          including Member Obligations, Refund & Cancellation and Privacy
          Policy.
        </p>
      </div>
      <div className="flex max-w-[794px] w-full justify-between">
        <div className="flex justify-end md:gap-[60px] gap-[32px] max-sm:flex-col">
          {/* Contact us */}
          <address className="flex flex-col md:gap-6 gap-4 md:max-w-[196px] max-w-[139px] w-full not-italic">
            <h1 className="text-floralWhite md:text-2xl text-sm font-medium leading-normal font-interTight">
              Contact us
            </h1>
            <p className="text-floralWhite md:text-lg text-[13px] font-interTight font-normal leading-[140%]">
               LLC
              <br />
              140 Broadway 46th Floor
              <br />
              New York, NY 10005
              <br />
              United States
            </p>
          </address>
          {/* download */}
          <div className="flex flex-col md:gap-6 gap-[8px] max-w-[277px] w-full">
            <h1 className="text-floralWhite md:text-2xl text-sm font-medium leading-normal font-interTight">
              Download our mobile app
            </h1>
            <div className="flex max-[375px]:flex-col max-[375px]:items-center gap-[5px]">
              <Link href=""  className=' hover:scale-90 transition duration-500 ease-in-out'>
                <GooglePlayIconFooter />
              </Link>
              <Link href="/"  className=' hover:scale-90 transition duration-500 ease-in-out'>
                <AppStoreIcon1 />
              </Link>
            </div>
          </div>
        </div>
        <div>
          {/* links */}
          <div className="flex flex-col md:gap-[33px] gap-6">
            <Link
              className="bg-coarseWool hover:bg-[#1877F2] w-fit h-fit duration-300 rounded-full"
              href="https://m.facebook.com/login/?locale=en_GB"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
               className="bg-coarseWool hover:bg-[#1DA1F2] w-fit h-fit duration-300 rounded-full"
              href="https://x.com/"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </Link>
            <Link
              className="bg-coarseWool hover:bg-[#FF0000] w-fit h-fit duration-300 rounded-full"
              href="https://www.youtube.com/"
              aria-label="YouTube"
            >
              <YoutubeIcon />
            </Link>
            <Link
              className="bg-coarseWool group hover:bg-[#E1306C] w-fit h-fit duration-300 rounded-full"
              href="https://www.instagram.com/terms/accept/"
              aria-label="Instagram"
            >
            <InstagramIcon/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></>
  );
};

export default Footer;
