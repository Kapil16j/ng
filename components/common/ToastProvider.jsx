"use client";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


export default function ToastProvider({ children }) {
  

  return (
    <>
      {children}
      <ToastContainer
        bodyClassName={() => "text-sm font-white flex font-med block p-3"}
        position="bottom-right"
        autoClose={3000}
      />
    </>
  );
}