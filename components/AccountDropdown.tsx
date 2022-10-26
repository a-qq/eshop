import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavLink } from "./NavLink";
import Image from "next/image";

export const AccountDropdown = ({ className = "" }) => {
  const [open, setOpen] = useState(false);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === `Esc` || e.key === `Escape`) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
      >
        <Image
          className="h-full w-full object-cover"
          layout="fill"
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="Your avatar"
        />
      </button>

      {open ? (
        <>
          <button
            onClick={() => setOpen(false)}
            tabIndex={-1}
            className="fixed inset-0 h-full w-full cursor-default"
          ></button>
          <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-lg shadow-xl">
            <NavLink
              href="/settings"
              activeClassName="bg-indigo-400"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-300 hover:text-text-gray-900"
            >
              Settings
            </NavLink>
            <NavLink
              href="/#"
              activeClassName="bg-indigo-400"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-300 hover:text-text-gray-900"
            >
              Support
            </NavLink>
            <Link href="/#">
              <a className="block px-4 py-2 text-gray-800 hover:bg-indigo-300 hover:text-text-gray-900">
                Sign out
              </a>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};
