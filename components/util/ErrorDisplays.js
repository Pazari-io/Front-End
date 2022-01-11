import Nav from '../NavBar';
import Link from 'next/link';
import WhyOne from '../../public/images/WhyOne.png';
import Image from 'next/image';

export const displayUserLoginButton = (authenticate) => {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />
      <div className="flex justify-center py-2">
        <h2>Please login before uploading an item</h2>
      </div>
      <div className="flex justify-center">
        <div
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </main>
  );
};

export const displayProfileButton = () => {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />

      <div className="grid grid-cols-2 gap-4 ">
        <div className="py-24 text-center">
          <div className="flex flex-col items-center justify-center">
            <div>To start publishing assets, you need to update your profile. </div>
            <div>
              <Link href="/user/profile">
                <a className="inline-flex justify-center px-4 py-2 mx-4 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Update Profile
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-12">
          <Image
            alt="Profile"
            className="my-4 rounded-lg"
            src={WhyOne}
            placeholder="blur"
            width={700}
            height={475}
          />
        </div>
      </div>
    </main>
  );
};
