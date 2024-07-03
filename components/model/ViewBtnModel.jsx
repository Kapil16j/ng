"use client";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import ModelFile from "./ModelFile";

export default function ViewBtnModel({ children }) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div onClick={open}>{children}</div>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none "
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex max-h-screen h-full items-center justify-center ">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <DialogPanel className="max-h-screen">
                  <ModelFile close={close} />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
