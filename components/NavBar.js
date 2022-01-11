/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useDarkMode from '../hooks/useDarkMode';
import { useMoralis, useNativeBalance, useChain } from 'react-moralis';
import AvaxPrice from './AvaxPrice';
import Image from 'next/image';
import Pazari from '../public/images/Pazari.png';

const navigation = [
  { name: 'MarketPlace', href: '/', current: false },
  { name: 'Learn', href: '/learn', current: false },
  { name: 'About', href: '/about', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// const switchRequest = () => {
//   return window.ethereum.request({
//     method: 'wallet_switchEthereumChain',
//     params: [{ chainId: '0xA869' }]
//   });
// };

// const addChainRequest = () => {
//   return window.ethereum.request({
//     method: 'wallet_addEthereumChain',
//     params: [
//       {
//         chainId: '0xA869',
//         chainName: 'Avalanche FUJI C-Chain',
//         rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
//         blockExplorerUrls: ['https://testnet.snowtrace.io/'],
//         nativeCurrency: {
//           name: 'AVAX',
//           symbol: 'AVAX',
//           decimals: 18
//         }
//       }
//     ]
//   });
// };

//   // if (account !== null && chainId !== '0xA869' && window.ethereum) {
//   //   try {
//   //     await switchRequest();
//   //   } catch (error) {
//   //     if (error.code === 4902) {
//   //       try {
//   //         await addChainRequest();
//   //         await switchRequest();
//   //       } catch (addError) {}
//   //     }
//   //   }
// }
export default function Nav() {
  const [colorTheme, setTheme] = useDarkMode();

  const router = useRouter();
  const {
    authenticate,
    isAuthenticated,
    logout,
    enableWeb3,
    account,
    chainId,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading
    //web3EnableError
  } = useMoralis();

  const { switchNetwork } = useChain();

  const NativeBalance = () => {
    const {
      //   getBalance,
      data: balance,
      // nativeToken,
      error,
      isLoading
    } = useNativeBalance({ chain: '0xA869' });

    if (!account || !isAuthenticated) return null;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error getting balance...</div>;

    // seems balance.formated doesn't work on testnet for some reason
    return <div>{(balance.balance / Math.pow(10, 18)).toString()}</div>;
  };

  useEffect(() => {
    const main = async () => {
      if (isAuthenticated && account && !isWeb3Enabled && !isWeb3EnableLoading) {
        enableWeb3();
      }
      //0xA869 - avax testnet
      //0x539 - ganache
      //0x7a69 - hardhat
      if (isWeb3Enabled && chainId !== '0xA869' && chainId !== '0x539' && chainId !== '0x7a69') {
        await switchNetwork('0xA869');
      }
    };
    main();
  }, [chainId, account, isWeb3Enabled, isAuthenticated]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}

                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0"></div>

                <Image src={Pazari} alt="Pazari" height="20" width="90" />

                <div className="hidden sm:block sm:ml-6">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            router.pathname == item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden px-2 ml-4 mr-4 md:block">
                  <AvaxPrice />
                </div>

                {colorTheme === 'light' ? (
                  <svg
                    onClick={() => setTheme('light')}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 text-gray-200 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setTheme('dark')}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 text-gray-200 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
                {/* <button
                 
                  type="button"
                  className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <LoginIcon className="w-6 h-6" aria-hidden="true" />
                </button> */}

                {(account === null || !isAuthenticated) && (
                  <img
                    className="w-8 h-8 ml-4 mr-4"
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                    onClick={async () => {
                      await authenticate();
                      //enableWeb3();
                    }}
                  />
                )}

                {/* Profile dropdown */}

                {account !== null && isAuthenticated && (
                  <Menu as="div" className="relative z-30 ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://store.playstation.com/store/api/chihiro/00_09_000/container/CH/de/99/EP2402-CUSA05624_00-AV00000000000217/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/user/upload">
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}>
                                Upload Item
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/user/profile">
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}>
                                Your Profile
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/user/dashboard">
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}>
                                Your Dashboard
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                logout();
                              }}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}>
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
