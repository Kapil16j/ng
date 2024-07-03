import React from 'react'
import { PriceCardData } from '../common/Helper'

const PriceCard = () => {
  return (
    <>
      <div className='w-full grid grid-cols-2 lg:grid-cols-4 items-center gap-3 md:gap-[23px] '>
      {PriceCardData.map((item, index) => (
<div className='lg:max-w-[300px] w-full p-3 sm:p-6 rounded-[12px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] hover:scale-95 duration-300 cursor-pointer' key={index}>
<div className='flex justify-between'>
<p className=' font-inter font-medium text-[14px] leading-[142%] text-ruinedSmores'>{item.text}</p>
<span>{item.icon}</span>
</div>
<p className='pt-2 font-inter font-bold text-[20px] sm:text-[24px] leading-[133%] text-ruinedSmores'>{item.payment}</p>
<p className=' font-inter font-normal text-[12px] leading-[133%] text-[#71717A] line-clamp-1'>{item.decs}</p>
</div>
  ))}
      </div>
    </>
  )
}

export default PriceCard
