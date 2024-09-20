import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
       <img src="/assets/img/checkMark.png" className='w-14 h-14 mt-1'></img>
      <div className="">
       
        {/* Success message */}
        <p className="text-lg font-medium text-gray-700">
          Your transaction has been completed successfully. We have emailed you details of your order.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
