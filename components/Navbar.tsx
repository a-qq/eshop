import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AccountDropdown } from "./AccountDropdown";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <img className="h-8" src="/aqq_logo.svg" alt="a-qq logo" />
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setOpen(!open)}
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
      <nav className={`${open ? "block" : "hidden"} sm:block`}>
        <div className="px-2 pt-2 pb-4 sm:flex sm:p-0">
          <a
            href="/"
            className="block text-white font-semibold rounded px-2 py-1 hover:bg-gray-800"
          >
            Home
          </a>
          <a
            href="/about"
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
          <AccountDropdown className="hidden sm:block sm:ml-6" />
        </div>
        <div className="px-4 py-5 border-t border-gray-800 sm:hidden">
          <div className="flex items-center">
            <img
              className="h-8 w-8 border-2 border-gray-600 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="Your avatar"
            />
            <span className="ml-3 font-semibold text-white">Adam Kowalski</span>
          </div>
          <div className="mt-4">
            <a href="#" className="block text-gray-400 hover:text-white">
              Settings
            </a>
            <a href="#" className="mt-2 block text-gray-400 hover:text-white">
              Support
            </a>
            <a href="#" className="mt-2 block text-gray-400 hover:text-white">
              Sign out
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
