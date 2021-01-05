import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className='shadow-xl fixed w-screen'>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <h1 className='text-2xl text-white'>FivesFilter</h1>
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <Link
                    to={DashboardRoute}
                    className={`${
                      pathname === DashboardRoute
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium'`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to={ReportsRoute}
                    className={`${
                      pathname === ReportsRoute
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium'`}
                  >
                    Reports
                  </Link>

                  <Link
                    to={BulkRequestRoute}
                    className={`${
                      pathname === BulkRequestRoute
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium'`}
                  >
                    Bulk Upload
                  </Link>

                  <Link
                    to={SettingsRoute}
                    className={`${
                      pathname === SettingsRoute
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium'`}
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </div>
            <div className='md:block'>
              <div className='-mr-2 flex md:hidden'>
                {/* <!-- Mobile menu button --> */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                >
                  <span className='sr-only'>Open main menu</span>
                  {/* <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
            --> */}
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                  {/* <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            --> */}
                  <svg
                    className='hidden h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!--
          Mobile menu, toggle classes based on menu state.
    
          Open: "block", closed: "hidden"
        --> */}
        <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              to={DashboardRoute}
              className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Dashboard
            </Link>

            <Link
              to={ReportsRoute}
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Reports
            </Link>

            <Link
              to={SettingsRoute}
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
