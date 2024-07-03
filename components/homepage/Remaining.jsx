import React from "react";
import Image from "next/image";
import { LineIcon } from "../common/Icon";
import { remainindcard } from "../common/Helper";

const Remaining = () => {
    return (
        <>
            <div className='max-w-[1280px] flex flex-col max-2xl:px-6 pt-8 sm:pt-10 md:pt-[60px] lg:pt-[120px] gap-4 sm:gap-6 md:gap-8 w-full mx-auto'>
                <div className='flex items-center gap-2 md:gap-6'>
                    <LineIcon />
                    <p className='text-[10px] sm:text-[14px] md:text-[16px] font-bold font-interTight text-carbonColor  uppercase tracking-widest leading-normal'>remaining features</p>
                </div>
                <div className='grid lg:grid-cols-3 grid-cols-2 md:gap-x-12 sm:gap-x-6 gap-x-[14px] md:gap-y-8 sm:gap-y-6 gap-y-4'>
                    {remainindcard.map((items, index) => (
                        <div key={index} className='max-w-[394px] flex flex-col md:gap-8 gap-3 w-full sm:p-4 p-2  border border-kinglyCloud hover:scale-105 duration-500 cursor-pointer'>
                            <Image src={items.cardimg} width={362} height={240} alt='img' />
                            <div className='flex flex-col md:gap-4 gap-2'>
                                <p className='xl:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] font-medium font-interTight'>{items.topheading}</p>
                                <p className=' max-w-[362px] w-full leading-[140%] xl:text-[18px] sm:text-[15px] text-[11px] font-interTight font-normal text-carbonColor'><span>{items.span1}</span> <span className='font-bold'>{items.span2}</span> <span>{items.span3}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </>
  );
};

export default Remaining;
