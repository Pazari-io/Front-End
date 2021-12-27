import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function Pagination() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-700 hover:bg-gray-50">
          Previous
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of <span className="font-medium">97</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-l-md hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-gray-300">
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-gray-300 hover:bg-gray-50">
              2
            </a>

            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-gray-300 hover:bg-gray-50">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-gray-300 hover:bg-gray-50">
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-gray-300 hover:bg-gray-50">
              9
            </a>

            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-r-md hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
