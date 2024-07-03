import Image from "next/image";
import React from "react";

const Searchandfilter = () => {
  return (
    <>
      <div className="max-w-[1184px] w-full ">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col md:gap-4 gap-2">
            <p className="text-carbonColor font-interTight xl:text-5xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold leading-[120%] lg:max-w-[558px] W-full">
              Search and filter grants based on your interests, location and
              more!
            </p>
            <p className="text-fiftiethShadeOfGrey font-interTight lg:text-lg sm:text-base text-[13px] lg:leading-[160%] leading-[140%] max-sm:max-w-[342px] lg:max-w-[608px]  w-full">
              Our Grants Database will help you search and filter grant
              opportunities based on your location and thematic areas of work
              and interest. The Advanced Grant Search feature can segment grants
              according to regions, grant size, grant type, keywords and also by
              donor agency.
            </p>
          </div>

          <div className="max-w-[520px] max-lg:hidden">
            <Image
              src="/assets/img/grant_database_img.png"
              width={520}
              height={303}
              alt="ss--img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchandfilter;
