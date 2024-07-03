import React from 'react'
import { RecentSalesData } from '../common/Helper'

const RecentSales = () => {
  return (
    <>
      <div className='xl:max-w-[528px] w-full bg-white rounded-[8px] border border-[#E4E4E7] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] p-3 sm:p-4 md:p-6'>
<p className=' font-inter font-semibold text-[16px] leading-[100%] tracking-[-0.4px] text-ruinedSmores'>Recent Sales</p>
<p className='pt-[6px] font-inter font-normal text-[14px] leading-[142%] text-[#71717A]'>You made 265 sales this month.</p>
<div className='flex flex-col gap-6 md:gap-8 mt-6 xl:max-h-[328px] h-fit xl:overflow-auto scrollbar_hide'>
{RecentSalesData.map((item, index) => (
<div className='flex justify-between items-center' key={index}>
<div className='flex items-center gap-4'>
<div className="min-w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
<img src={item.img} alt="profile image " width={40} height={40} />
</div>
<div>
<p className=' font-inter font-medium text-[14px] leading-[100%] text-ruinedSmores'>{item.text}</p>
<p className=' font-inter font-normal text-[14px] leading-[142%] text-[#71717A]'>{item.email}</p>
</div>
</div>
<p className=' font-inter font-medium text-[14px] leading-[142%] text-ruinedSmores'>+$1,999.00</p>
</div>
))}
</div>
      </div>
    </>
  )
}

export default RecentSales
