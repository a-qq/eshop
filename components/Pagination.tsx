import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationProps {
  pageSize: number;
  total: number;
  className?: string 
}

export const usePagination = () => {
  const router = useRouter();
  const pageNumber =
    (router.query.pageNumber &&
      Number.parseInt(router.query.pageNumber.toString())) ||
    1;

  const getPageHref = (pageNumber: number) => {
    return {
      pathname: router.pathname,
      query: { ...router.query, pageNumber: pageNumber },
    };
  };

  return { pageNumber, getPageHref };
};

export const Pagination = ({ pageSize, total, className="" }: PaginationProps) => {
  const { pageNumber, getPageHref } = usePagination();
  const totalPageNumber = Math.ceil(total / pageSize);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  const prevHref = getPageHref(prev);
  const nextHref = getPageHref(next);
  const itemsShown = pageNumber * pageSize;
  return (
    <div className={`flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 ${className}`}>
      <div className="flex flex-1 justify-between sm:hidden">
        <Link href={prevHref}>
          <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </a>
        </Link>
        <Link href={nextHref}>
          <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </a>
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center md:justify-between">
        <div className="hidden md:flex">
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {" "}
              {itemsShown - pageSize + 1}{" "}
            </span>
            to
            <span className="font-medium"> {itemsShown > total ? total : itemsShown} </span> of
            <span className="font-medium"> {total} </span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pageNumber > 1 ? (
              <Link href={prevHref}>
                <a className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            ) : null}
            {pageNumber > 2 ? (
              <Link href={getPageHref(1)}>
                <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  1
                </a>
              </Link>
            ) : null}
            {pageNumber - 2 > 1 && totalPageNumber > 4 ? (
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            ) : null}
            {pageNumber === totalPageNumber && totalPageNumber > 5 ? (
              <Link href={getPageHref(pageNumber - 2)}>
                <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  {pageNumber - 2}
                </a>
              </Link>
            ) : null}
            {pageNumber > 1 ? (
              <Link href={getPageHref(pageNumber - 1)}>
                <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  {prev}
                </a>
              </Link>
            ) : null}
            <Link href={getPageHref(pageNumber)}>
              <a
                aria-current="page"
                className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
              >
                {pageNumber}
              </a>
            </Link>
            {pageNumber < totalPageNumber ? (
              <Link href={nextHref}>
                <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  {next}
                </a>
              </Link>
            ) : null}
            {pageNumber === 1 && totalPageNumber > 5 ? (
              <Link href={getPageHref(pageNumber + 2)}>
                <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  {pageNumber + 2}
                </a>
              </Link>
            ) : null}
            {pageNumber + 2 < totalPageNumber && totalPageNumber > 4 ? (
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            ) : null}
            {pageNumber + 1 < totalPageNumber ? (
              <Link href={getPageHref(totalPageNumber)}>
                <a className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${true?"md:inline-flex" : ""}`}>
                  {totalPageNumber}
                </a>
              </Link>
            ) : null}
            {pageNumber < totalPageNumber ? (
              <Link href={nextHref}>
                <a className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
};
