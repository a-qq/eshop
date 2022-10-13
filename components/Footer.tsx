import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-screen-3xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved. </span>
              <Link href="/#">
                <a className="inline-block text-teal-600 underline transition hover:text-teal-600/75">
                  Terms & Conditions
                </a>
              </Link>
              <span> &middot; </span>
              <Link href="/#">
                <a className="inline-block text-teal-600 underline transition hover:text-teal-600/75">
                  Privacy Policy
                </a>
              </Link>
            </p>
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2022 a-qq
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
