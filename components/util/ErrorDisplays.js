import Nav from '../NavBar';
import Link from 'next/link';

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
}

export const displayProfileButton = () => {
    return (
      <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
        <Nav />
        <div className="flex justify-center py-2">
          <h2>Please create a profile before uploading an item</h2>
        </div>
        <div className="flex justify-center py-2">
          <Link href="/user/profile">
            <a className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Your Profile
            </a>
          </Link>
        </div>
      </main>
    );
}