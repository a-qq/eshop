import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { AccountDropdown } from "./AccountDropdown";
import { NavLink } from "./NavLink";
import Image from "next/image";
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-6 lg:px-8 sm:py-3">
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
          <NavLink
            href="/"
            exact={true}
            active="bg-gray-900 text-white"
            inactive="text-gray-100"
            className="mt-1 block font-semibold rounded px-2 py-1 hover:bg-gray-700 sm:mt-0 sm:ml-2"
          >
            Home
          </NavLink>
          <NavLink
            href="/about"
            active="bg-gray-900 text-white"
            inactive="text-gray-100"
            className="mt-1 block font-semibold rounded px-2 py-1 hover:bg-gray-700 sm:mt-0 sm:ml-2"
          >
            About
          </NavLink>
          <NavLink
            href="/productsCSR"
            active="bg-gray-900 text-white"
            inactive="text-gray-100"
            className="mt-1 block font-semibold rounded px-2 py-1 hover:bg-gray-700 sm:mt-0 sm:ml-2"
          >
            CSR
          </NavLink>
          <NavLink
            href="/productsSSG/1"
            active="bg-gray-900 text-white"
            inactive="text-gray-100"
            className="mt-1 block font-semibold rounded px-2 py-1 hover:bg-gray-700 sm:mt-0 sm:ml-2"
          >
            SSG
          </NavLink>
          <NavLink
            href="/productsISR/1"
            active="bg-gray-900 text-white"
            inactive="text-gray-100"
            className="mt-1 block font-semibold rounded px-2 py-1 hover:bg-gray-700 sm:mt-0 sm:ml-2"
          >
            ISR
          </NavLink>
          <AccountDropdown className="hidden sm:block sm:ml-6" />
        </div>
        <div className="px-4 py-5 border-t border-gray-600 sm:hidden">
          <div className="flex items-center">
            <div className="border-2 border-gray-600 rounded-full w-8 h-8">
              <Image
                className="object-cover rounded-full"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Your avatar"
                layout="responsive"
                width={32}
                height={32}
              />
            </div>
            <span className="ml-3 font-semibold text-white">Adam Kowalski</span>
          </div>
          <div className="mt-4">
            <NavLink
              href="/settings"
              active="text-gray-200"
              inactive="text-gray-400"
              className="block hover:text-white"
            >
              Settings
            </NavLink>
            <NavLink
              href="/#"
              active="text-gray-100"
              inactive="text-gray-400"
              className="mt-2 block hover:text-white"
            >
              Support
            </NavLink>
            <Link href="/#">
              <a className="mt-2 block text-gray-400 hover:text-white">
                Sign out
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
