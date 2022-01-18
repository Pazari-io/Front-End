import { useRef, useState } from 'react';
import ZeroProfile from '../../../components/ZeroProfile';
import { useMoralis } from 'react-moralis';
import Uploader from '../../../components/Uploader';
import { uploadToMoralis } from '../../../components/Uploader';
import React from 'react';
import { displayUserLoginButton } from '../../../components/UserLoader';
import { getProfileFromDB } from '../../../components/MoralisDAO';
import Modal from '../../../components/Modal';
import { Loading } from '../../../components/Loading';

function UserProfile(props) {
  // state what we are updating
  let profileObject = {
    link: props.profile.get('link'),
    about: props.profile.get('about'),
    cover: props.profile.get('cover'),
    avatar: props.profile.get('avatar'),
    notifications: props.profile.get('notifications'),
    socials: props.profile.get('socials')
  };

  const avatarFile = useRef(null);
  const [updatedProfile, setUpdatedProfile] = useState(profileObject);
  const [profileSaved, setProfileSaved] = useState(false);
  const [coverFile, setCoverFile] = useState([]);

  const onChangeAvatar = (evt) => {
    let file = evt.target.files[0];
    let Moralis = props.Moralis;

    const moralisFile = new Moralis.File(file.name, file);

    moralisFile.save().then(
      function () {
        // get the url only
        setUpdatedProfile({ ...updatedProfile, avatar: moralisFile._url });
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    uploadToMoralis(coverFile, props.Moralis).then((fileNames) => {
      if (fileNames.length > 0) {
        updatedProfile.cover = fileNames[0];
      }

      let profile = props.profile;
      profile.set(updatedProfile);
      profile.save().then(() => {
        setProfileSaved(true);
      });

      // not the best idea
      setTimeout(function () {
        location.reload();
      }, 2000);
    });
  };

  return (
    <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">
      <div>
        {profileSaved && <Modal title="Success !" description="Your profile saved successfully." />}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <p className="px-12 pb-4 text-2xl">
                Howdy <span className="text-indigo-400"> {props.profile.get('username')} </span>
                {''}
              </p>
              <p className="px-12 mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              {props.profile.get('level') !== 3 && (
                <p className="px-12 py-2 mt-1 text-sm text-gray-500">
                  Your current verification level is {props.profile.get('level')}
                </p>
              )}

              {props.profile.get('level') === 3 && (
                <p className="px-12 py-2 mt-1 text-sm text-blue-600">
                  You got the verified badge !
                </p>
              )}

              <p
                className={`px-12 py-1 mt-1 text-sm ${
                  props.profile.get('level') >= 0 ? 'text-green-500 line-through' : 'text-gray-500'
                }`}>
                to get to level 0 add username and an e-mail address.
              </p>

              <p
                className={`px-12 py-1 mt-1 text-sm ${
                  props.profile.get('level') >= 1 ? 'text-green-500 line-through' : 'text-gray-500'
                }`}>
                To get level 1 verify your e-mail and add social links.
              </p>

              <p
                className={`px-12 py-1 mt-1 text-sm ${
                  props.profile.get('level') >= 2 ? 'text-green-500 line-through' : 'text-gray-500'
                }`}>
                To get level 2 make a sell or purchase.
              </p>

              <p
                className={`px-12 py-1 mt-1 text-sm ${
                  props.profile.get('level') >= 3 ? 'text-green-500 line-through' : 'text-gray-500'
                }`}>
                To get level 3 and get verified badge contact{' '}
                <a className="text-indigo-400" href="mailto:hello@pazari.io">
                  us.{' '}
                </a>
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
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
                        https://
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        value={updatedProfile.link}
                        onChange={(event) =>
                          setUpdatedProfile({ ...updatedProfile, link: event.target.value })
                        }
                        className="flex-1 block w-full border-gray-300 rounded-none dark:border-indigo-400 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                        placeholder={props.profile.get('link')}
                      />
                    </div>
                  </div>
                </div>

                {/* <div>
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
                      //value={profile['name']}
                      //onChange={(event) => updateProf(profile, 'name', event)}
                      className="block w-full py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700"
                      placeholder="Username..."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Username, this is the name users will see!
                  </p>
                </div> */}

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      rows="10"
                      name="about"
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700"
                      placeholder={props.profile.get('about')}
                      value={updatedProfile.about}
                      onChange={(event) =>
                        setUpdatedProfile({ ...updatedProfile, about: event.target.value })
                      }
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
                    {updatedProfile.avatar === '' ? (
                      <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                        <svg
                          className="w-full h-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    ) : (
                      <img src={updatedProfile.avatar} className="w-12 h-12 rounded-full" />
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        avatarFile.current.click();
                      }}
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:text-gray-300 dark:bg-black dark:border-indigo-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Change
                    </button>
                    <input
                      className="hidden"
                      type="file"
                      id="file"
                      onChange={onChangeAvatar}
                      ref={avatarFile}></input>
                  </div>
                </div>

                <div>
                  {updatedProfile.cover !== '' ? (
                    <img className="rounded-lg max-h-80 max-w-96" src={updatedProfile.cover} />
                  ) : (
                    ''
                  )}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cover photo
                  </label>

                  <Uploader
                    type={'profileCover'}
                    setData={setUpdatedProfile}
                    data={updatedProfile}
                    Moralis={props.Moralis}
                    allowMultiple={false}
                    files={coverFile}
                    setFiles={setCoverFile}
                  />
                </div>
              </div>
              <div className="px-4 py-3 text-right bg-gray-50 dark:bg-gray-900 sm:px-6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-indigo-400" />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-indigo-400" />
        </div>
      </div> */}

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
                          key={1}
                          id="sales"
                          name="sales"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded dark:border-indigo-400 focus:ring-indigo-500"
                          checked={updatedProfile.notifications.sales}
                          onChange={() =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              notifications: {
                                ...updatedProfile.notification,
                                sales: !updatedProfile.notifications.sales
                              }
                            })
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="sales"
                          className="font-medium text-gray-700 dark:text-gray-300">
                          Sales
                        </label>
                        <p className="text-gray-500">Get when you make a sale.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          key={2}
                          id="product"
                          name="product"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked={updatedProfile.notifications.product}
                          onChange={() =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              notifications: {
                                ...updatedProfile.notifications,
                                product: !updatedProfile.notifications.product
                                //sale: updatedProfile.notifications.sale
                              }
                            })
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-700 dark:text-gray-300">
                          Product
                        </label>
                        <p className="text-gray-500">Get notified when we release an update.</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start">
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
                    </div> */}
                  </div>
                </fieldset>
                {/* <fieldset>
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
                </fieldset> */}
              </div>
              <div className="px-4 py-3 text-right bg-gray-50 dark:bg-gray-900 sm:px-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AuthenticatedProfile(props) {
  let Moralis = props.Moralis;
  let user = props.user;

  let profile = getProfileFromDB(user);
  // loading
  if (!profile.loaded) return <Loading type="full" />;
  // handle error
  if (profile.error) return <>Error loading profile</>;
  // profile loaded and has the data can use profile.data
  if (profile.loaded && profile.data)
    return <UserProfile user={user} profile={profile.data[0]} Moralis={Moralis} />;
  // profile is loaded but has no data
  if (profile.loaded && !profile.data) return <ZeroProfile user={user} Moralis={Moralis} />;
}

export default function Profile() {
  const { isInitialized, hasAuthError, authError, isAuthenticated, user, Moralis, authenticate } =
    useMoralis();

  if (hasAuthError) return <>{authError}</>;

  if (!user && isInitialized) {
    return displayUserLoginButton(authenticate);
  }
  if (user && isAuthenticated && isInitialized);
  return <AuthenticatedProfile user={user} Moralis={Moralis} />;
}
