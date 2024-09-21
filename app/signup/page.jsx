'use client'

import Signup from "@/components/sign-up/Signup";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams()
  const sub_id = searchParams.get('sub_id')

  return (
    <>
      {" "}
      <Signup sub_id={sub_id} />{" "}
    </>
  );
};

export default page;
