import Zero from '../public/images/Zero.png';
import Image from 'next/image';
import { useState } from 'react';
import Nav from './NavBar';

async function createProfile(Moralis, user, username, email) {
  // ACL setup
  const acl = new Moralis.ACL();

  // only the owner can edit the profile
  acl.setWriteAccess(user.id, true);
  // public can read the profile
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);

  const Profile = Moralis.Object.extend('Profile');
  const profile = new Profile();
  profile.setACL(acl);

  let Verified = Moralis.Object.extend('Verified');
  let verified = new Verified();

  let verifiedACL = new Moralis.ACL();
  verifiedACL.setPublicReadAccess(true);
  verifiedACL.setRoleWriteAccess('Administrator', true);
  verified.setACL(verifiedACL);
  verified.set('isVerified', 'false');
  await verified.save();
  profile.set('verified', verified);

  // relation to user
  profile.set('user', user);

  // verification level
  profile.set('level', 0);

  // handle error
  await profile.save();

  // save the user also
  user.set('username', username);
  user.set('email', email);
  await user.save();

  window.location.reload();
}

export default function ZeroProfile(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">

      <div className="grid gap-4 grids-cols-1 md:grid-cols-2 ">
        <div className="mx-auto">
          <p className="px-4 py-4 mt-1 text-gray-400 text-md">
            Create a level 0 profile to begin your journey with Pazari.
          </p>
          <div className="relative">
            <label htmlFor="required-username" className="text-gray-700 dark:text-gray-400">
              Username
              <span className="text-red-500 required-dot">*</span>
            </label>
            <input
              type="text"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              name="username"
              placeholder="Your username"
              onInput={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="required-email" className="text-gray-700 dark:text-gray-400">
              E-mail
              <span className="text-red-500 required-dot">*</span>
            </label>
            <input
              type="email"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              name="email"
              placeholder="Your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex justify-center">
              <button
                className="inline-flex items-center px-4 py-2 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => createProfile(props.Moralis, props.user, username, email)}>
                Create Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <Image
            alt="Profile"
            className="my-4 rounded-lg"
            src={Zero}
            placeholder="blur"
            width={700}
            height={475}
          />
        </div>
      </div>
    </main>
  );
}
