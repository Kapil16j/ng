import { East, Link } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const SuccessPage = () => {
  const handleForward = () => {
    window.location.href = '/dashboard/home';
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-3">
       <img src="/assets/img/payment_success.jpg" className='w-[400px]'></img>
       <h1 className="text-3xl font-bold text-green-600 text-center">Payment Successful!</h1>
      <div className="mb-3">
        {/* Success message */}
        <p className="text-lg font-medium text-gray-700 text-center">
          Your transaction has been completed successfully. <br /> We have emailed you details of your order.
        </p>
      </div>
      <button className='px-2 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-700 m-4 animate-pulse  ' onClick={handleForward}>Go to home page <East /></button >
    </div>
  );
};

export default SuccessPage;
