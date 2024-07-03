import Link from 'next/link'
import React from 'react'

const Pricingbutton = ({ pricingbtn }) => {
  return (
    <>
      <div className="w-full">
        <Link href="#">
          <button className="w-full px-8 py-3 md:py-4 sm:mt-[44px] mt-[32px] bg-white duration-500 hover:bg-retroBlue hover:text-white rounded border border-retroBlue justify-center text-right text-retroBlue md:text-2xl sm:text-[18px] text-[14px] font-medium font-interTight items-center  inline-flex">
            {pricingbtn}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pricingbutton;
