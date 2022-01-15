import Nav from './NavBar';
import Link from 'next/link';
import Login from '../public/images/Login.png';
import Profile from '../public/images/Profile.png';
import Image from 'next/image';

export const displayUserLoginButton = (authenticate) => {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />

      <div className="grid gap-4 md:grid-cols-2 ">
        <div className="py-24 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="py-4 text-2xl">
              A new indie publishing journey starts , please login to continue.
            </div>

            <div className="flex items-center justify-center">
              <div
                className="inline-flex items-center py-2 text-lg font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm px-14 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                  await authenticate();
                }}>
                Login
                <img
                  className="w-8 h-8 ml-4 mr-2"
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden py-12 md:block">
          <Image
            alt="Profile"
            className="my-4 rounded-lg"
            src={Login}
            placeholder="blur"
            width={700}
            height={475}
          />
        </div>
      </div>
    </main>
  );
};

export const displayProfileButton = () => {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />

      <div className="grid gap-4 md:grid-cols-2 ">
        <div className="py-24 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl">
              To start publishing assets, you need to update your profile.{' '}
            </div>
            <div>
              <Link href="/user/profile">
                <a className="inline-flex justify-center py-2 mx-4 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm px-14 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Process
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden py-12 md:block">
          <Image
            alt="Profile"
            className="my-4 rounded-lg"
            src={Profile}
            placeholder="blur"
            width={700}
            height={475}
          />
        </div>
      </div>
    </main>
  );
};
