import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CraftyourdropdownIcons } from "../common/Icon";

export default function Craftyourdropdown() {
  return (
    <div>
      <Menu>
        <MenuButton className="max-sm:w-full flex sm:gap-[18px] gap-[7px] max-sm:justify-between border sm:text-[14px] text-[8px] items-center border-[#F2F2F2] rounded-[30px] sm:py-[9px] py-1 sm:px-4 px-2 ">
          Sort by: Latest
          <CraftyourdropdownIcons />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none z-50 max-sm:w-[90%]"
          >
            <MenuItem>
              <button className="group flex justify-center w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex justify-center w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                Duplicate
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button className="group flex justify-center w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                Archive
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex justify-center w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
