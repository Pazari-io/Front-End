
import { useEffect, useState } from 'react';
import Nav from './NavBar';
import Footer from './Footer';
import { getProfileFromDB } from './MoralisDAO';

async function createProfile(Moralis, user) {
  // ACL setup
  const acl = new Moralis.ACL();

  // only the owner can edit the profile
  acl.setWriteAccess(user.id, true);
  // public can read the profile
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);

  const Profile = Moralis.Object.extend('Profile');

  console.log(profile);
  const profileExistQuery = new Moralis.Query(Profile);
  profileExistQuery.equalTo('user', user);
  const profiles = await profileExistQuery.find();
  if (profiles[0]) {
    console.log('profile already exists');
    return profiles[0];
  }

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
  profile.set('userId', user.id);

  // handle error
  await profile.save();
  window.location.reload();
}

function createNewProfile(Moralis, user) {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />
      <div className="flex justify-center">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p className="px-12 py-4 mt-1 text-md text-gray-600">
            Create profile to begin uploading items!
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => createProfile(Moralis, user)}>
          Create Profile
        </button>
      </div>
    </main>
  );
}

async function saveProfile(profile, setUpdatedProfile) {
  console.log('saving profile');
  await profile.save();
  setUpdatedProfile(true);
}

function updatedProfileDisplay(updatedProfileDisplay) {
  if (updatedProfileDisplay) {
    return <span className="text-left px-4 text-indigo-500">Updated profile!</span>;
  }
  return <p></p>;
}

function updateProf(profile, field, event) {
  profile.set(field, event.target.value);
}

export default function ProfileForm(props) {
  let Moralis = props.Moralis;
  let user = props.user;
  const [updatedProfile, setUpdatedProfile] = useState(false);
  let dbProfiles = getProfileFromDB(user);
  if (dbProfiles.length === 0) {
    return createNewProfile(Moralis, user);
  }
  let profile = dbProfiles[0];

  //  - name (string) // Full name
  //  - email (string) // To recive notifications
  //  - about (string) // Author description
  //  - link  (string) // publisher personal url
  //  - verified (bool) // Default false
  //  - avatar (string) // avatar
  //  - cover (string) // banner image
  //  - contractAddr (string) //Reference to PazariToken contract that this user owns
  //  - notification (dict) // {"promotion" :false , "sells" : true }
  //  - userId (string) // User table has some protected access
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
      <Nav />
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="px-12 mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* <form onSubmit={() => saveProfile(user, profile, Moralis, createdProfile, setCreatedProfile)} > */}
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 my-1 space-y-6 bg-white dark:bg-gray-800 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Website
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 dark:border-indigo-400 rounded-l-md bg-gray-50 dark:bg-gray-700">
                        http://
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        value={profile.get('link')}
                        onChange={(event) => updateProf(profile, 'link', event)}
                        className="flex-1 block w-full border-gray-300 rounded-none dark:border-indigo-400 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="about"
                      name="about"
                      rows={3}
                      value={profile.get('name')}
                      onChange={(event) => updateProf(profile, 'name', event)}
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700"
                      placeholder="Username..."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Username, this is the name users will see!
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    About
                  </label>
                  <div className="mt-1">
                    <input
                      id="about"
                      name="about"
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700"
                      placeholder="I am an awsome publisher."
                      value={profile.get('about')}
                      onChange={(event) => updateProf(profile, 'about', event)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Photo
                  </label>
                  <div className="flex items-center mt-1">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                      <svg
                        className="w-full h-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:text-gray-300 dark:bg-black dark:border-indigo-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cover photo
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md dark:border-indigo-400 dark:bg-gray-700">
                    <div className="space-y-1 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 ">
                        <label
                          htmlFor="file-upload"
                          className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer dark:bg-gray-700 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1 dark:text-gray-400">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right bg-gray-50 dark:bg-gray-900 sm:px-6">
                {updatedProfileDisplay(profile)}
                <button
                  // type='submit'
                  onClick={() => saveProfile(profile, setUpdatedProfile)}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-indigo-400" />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-indigo-400" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <p className="px-12 mt-1 text-sm text-gray-600">
                Decide which communications you'd like to receive and how.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="px-4 py-5 space-y-6 bg-white dark:bg-gray-800 sm:p-6">
                <fieldset>
                  <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
                    By Email
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded dark:border-indigo-400 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a posting.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="font-medium text-gray-700">
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="offers" className="font-medium text-gray-700">
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
                      Push Notifications
                    </legend>
                    <p className="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block ml-3 text-sm font-medium text-gray-700">
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-email"
                        className="block ml-3 text-sm font-medium text-gray-700">
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block ml-3 text-sm font-medium text-gray-700">
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="px-4 py-3 text-right bg-gray-50 dark:bg-gray-900 sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}