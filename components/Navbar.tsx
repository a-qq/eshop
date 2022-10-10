import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <img className="h-8" src="/aqq_logo.svg" alt="a-qq logo" />
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => {
              setOpen(!open);
            }}
            type="button"
            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
          >
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div className={`${open ? "block" : "hidden"} px-2 pt-2 pb-4 sm:flex sm:p-0`}>
        <a
          href="#"
          className="block text-white font-semibold rounded px-2 py-1 hover:bg-gray-800"
        >
          Home
        </a>
        <a
          href="#"
          className="mt-1 block text-white font-semibold rounded px-2 py-1 hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          About
        </a>
        <a
          href="#"
          className="mt-1 block text-white font-semibold rounded px-2 py-1 hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Collections
        </a>
        <a
          href="#"
          className="mt-1 block text-white font-semibold rounded px-2 py-1 hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Other
        </a>
      </div>
    </header>
  );
};