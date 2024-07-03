"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { DownArrowIcon } from "./Icon";

const Naimur = [
  { id: 1, name: "Naimur Rahman" },
  { id: 2, name: "Naimur Rahman" },
  { id: 3, name: "Naimur Rahman" },
];

export default function NaimurDropDown() {
  const [selected, setSelected] = useState(Naimur[1]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            "relative  font-montserrat font-medium text-[12px] leading-[150%] text-carbonColor z-20 flex gap-[5px] items-center px-1 justify-center ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selected.name}
          <DownArrowIcon aria-hidden="true" />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] rounded-xl border border-white/5 bg-white z-[200]  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {Naimur.map((Naimur) => (
              <ListboxOption
                key={Naimur.name}
                value={Naimur}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <div className="text-sm/6 font-montserrat font-medium text-[12px] leading-[150%] text-carbonColor ">
                  {Naimur.name}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
