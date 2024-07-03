"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { VideoIcon, VideoModalCloseIcon } from "../common/Icon";
import Image from "next/image";

export default function VideoComponent() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={open}
        className="rounded-lg bg-[url(' /assets/img/video-component-bg.webp')] bg-center bg-cover bg-no-repeat flex items-center justify-center w-[342px] sm:w-[444px] h-[228px] sm:h-[578px] cursor-pointer relative"
      >
        <Image
          src="/assets/img/video-component-bg.webp"
          alt="bg-img"
          width={444}
          height={578}
          className="max-sm:hidden"
        />
        <Image
          src="/assets/img/video-component-bg-mobile.webp"
          alt="bg-img"
          width={342}
          height={228}
          className="sm:hidden max-w-[342px] w-full "
        />
        <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center w-[59px] h-[59px] bg-white rounded-full">
          <VideoIcon />
        </span>
      </div>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-50 h-screen flex items-center justify-center"
          onClose={close}
          __demoMode
        >
          <div className=" fixed inset-0 z-50 flex w-full h-screen items-center justify-center  bg-black/80 p-4 ">
            <div
              className="absolute top-5 md:top-10 right-5 md:right-10 cursor-pointer hover:rotate-[360deg] transition duration-300 ease-in-out"
              onClick={close}
            >
              <VideoModalCloseIcon />
            </div>
            <video
              src="/assets/img/about_us_video.mp4"
              width={1000}
              height={1000}
              controls
            ></video>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
