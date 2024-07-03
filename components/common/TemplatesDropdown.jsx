"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { DownArrowIcon2, TemplatesSidebarIcon } from "./Icon";

export default function TemplatesDropdown() {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <div
              className={`w-full py-[11px] px-3 rounded-[4px] max-w-[228px] border border-[rgba(255,255,255,0.11)] bg-transparent group hover:bg-retroBlue flex gap-3 items-center transition duration-300 ease-in-out ${
                open ? "!bg-retroBlue" : ""
              }`}
            >
              <TemplatesSidebarIcon color={open ? "white" : "currentColor"} />
              <div className="flex gap-2 items-center">
                <h3
                  className={`font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool ${
                    open ? "!text-white" : ""
                  }`}
                >
                  Custom Templates
                </h3>
                <span
                  className={`w-fit h-fit  ${
                    open ? " rotate-180 text-white" : ""
                  }`}
                >
                  <DownArrowIcon2 color={open ? "white" : "currentColor"} />
                </span>
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="py-3 flex flex-col gap-4 bg-white rounded-[4px] mt-1">
            <Link href="#">
              <div className="w-full px-4 group">
                <h3 className="font-interTight font-normal text-[18px] leading-[140%] group-hover:text-retroBlue text-coarseWool">
                  All Students
                </h3>
              </div>
            </Link>
            <Link href="#">
              <div className="w-full px-4 group">
                <h3 className="font-interTight font-normal text-[18px] leading-[140%] group-hover:text-retroBlue text-coarseWool">
                  Add Students
                </h3>
              </div>
            </Link>
            <Link href="#">
              <div className="w-full px-4 group">
                <h3 className="font-interTight font-normal text-[18px] leading-[140%] group-hover:text-retroBlue text-coarseWool">
                  Students Promotion
                </h3>
              </div>
            </Link>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
