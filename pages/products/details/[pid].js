import Nav from '../../../components/NavBar';
import ProductDetail from '../../../components/ProductDetail';
import Footer from '../../../components/Footer';
import { Tab } from '@headlessui/react';
import { useMoralis } from 'react-moralis';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getProductWithId, ownedItems } from '../../../components/MoralisDAO';
import { buyItem} from '../../../components/ContractAccess';
import Custom404 from '../../404.js';
import { displayUserLoginButton } from '../../../components/UserLoader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function displayStars() {
  let res = [];
  let rating = 3;
  for (let i = 1; i <= 5; i++) {
    let classFill = 'w-4 h-4 text-yellow-500 fill-current';
    if (rating < i) {
      classFill = 'w-4 h-4 fill-current';
    }
    let star = (
      <svg
        key={Math.random().toString()}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={classFill}>
        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
      </svg>
    );
    res.push(star);
  }

  return <div className="flex items-center p-4 text-sm text-gray-600">{res}</div>;
}

function getChangelog(product) {
  let result = [];
  let changes = product.get('changeLog');
  for (const [key, val] of Object.entries(changes)) {
    result.push(
      <li key={'change' + key}>
        {key} : {val}
      </li>
    );
  }
  return (
    <ul className="text-gray-900 list-disc list-inside text-normal dark:text-gray-500">{result}</ul>
  );
}

function getLicense(product) {
  let result = [];
  let licenses = product.get('license');
  let i = 0;
  for (const val of licenses) {
    result.push(<li key={'license' + i}>{val}</li>);
    i++;
  }
  return (
    <ul className="text-gray-900 list-disc list-inside text-normal dark:text-gray-500">{result}</ul>
  );
}

function download(product) {
  console.log('download item: ' + product.get('itemID'));
}

function checkIfOwned(isOwner, product) {
  if (!isOwner) {
    return;
  }

  return (
    <div>
      <hr className="my-8 border-gray-400"></hr>
      <div className="flex justify-center py-2 font-bold dark:text-indigo-400">
        You own this item! Thank you for being a supporter
      </div>
      <div className="flex items-center py-2 justify-center">
        <button
          type="button"
          onClick={() => download(product)}
          className="px-4 py-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md md:w-1/3 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
          Download
        </button>
      </div>
    </div>
  );
}

export default function Detail() {
  const { isInitialized, hasAuthError, authError, isAuthenticated, account, authenticate } =
    useMoralis();
  const router = useRouter();
  const { pid } = router.query;

  if (hasAuthError) return <>{authError}</>;

  if (!account && isInitialized) {
    return displayUserLoginButton(authenticate);
  }

  //Need to make sure router hook completes.  Otherwise pid will be null and the moralis query will run twice causing a flicker
  if (pid && account && isAuthenticated && isInitialized) {
      return <LoadProduct pid={pid} account={account} />;
  }
  return <div>Loading...</div>;
}

function LoadProduct(props) {
  let productObj = getProductWithId(props.pid);
  if (!productObj.loaded) return <>Loading...</>;
  if (productObj.loaded && !productObj.data) {
    return <Custom404 />;
  }
  let product = productObj.data[0];
  return <ProductDetailPage product={product} account={props.account}/>
}

function ProductDetailPage(props) {
  let [categories] = useState({
    Reviews: [
      {
        id: 1,
        title: 'This is a review and this product is awesome also this product is nice',
        date: '5h ago'
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago'
      }
    ],
    License: [
      {
        id: 1,
        title: 'Is web3 making coffee better or worse?',
        date: 'Jan 7'
      },
      {
        id: 2,
        title: 'The most innovative things happening in web4',
        date: 'Mar 19'
      }
    ],
    Changelog: [
      {
        id: 1,
        title: '1.03 - Fixed some issues with materials',
        date: '2d ago'
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago'
      }
    ]
  });

  let product = props.product;
  let itemSoldObj = ownedItems(product.get('itemID'), props.account);
  if (!itemSoldObj.loaded) return <>Loading...</>;
  let isOwner = itemSoldObj.data !== null;

  let profile = product.get('profile');
  if (!profile) {
    profile = new Map();
  }

  return (
    <main className="mx-auto dark:bg-gray-900">
      <div className="container px-2 py-4 mx-auto md:flex">
        <div className="w-full py-10 rounded-lg md:w-1/2 px-14">
          <ProductDetail product={product} />
          <div className="mt-2 ">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                        selected
                          ? 'dark:bg-black bg-gray-200 shadow'
                          : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
                      )
                    }>
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {Object.values(categories).map((posts, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'bg-white dark:bg-gray-800 dark:text-gray-300 rounded-xl p-3',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                    )}>
                    <ul>
                      {posts.map((post) => (
                        <li key={post.id} className="relative p-3 rounded-md hover:bg-coolGray-100">
                          <h3 className="text-sm font-medium leading-5">{post.title}</h3>

                          <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                            <li>{post.date}</li>
                          </ul>

                          <a
                            href="#"
                            className={classNames(
                              'absolute inset-0 rounded-md',
                              'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="w-full py-10 md:w-1/2 md:px-14">
          <div className="flex items-center justify-between mb-4 ">
            <div>
              <div className="text-2xl font-bold dark:text-indigo-400">{product.get('title')}</div>
            </div>
            <div className="flex">{displayStars()}</div>
          </div>
          <div className="flex items-center">
            <div>
              <p className="mr-4 text-md dark:text-gray-300">By {profile.get('username')}</p>
            </div>
            <div>
              {profile.get('avatar') === '' ? (
                <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                  <svg
                    className="w-full h-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              ) : (
                <img src={profile.get('avatar')} className="w-12 h-12 rounded-full" />
              )}
            </div>
          </div>
          {checkIfOwned(isOwner, product)}
          <hr className="my-8 border-gray-400"></hr>
          <div className="dark:text-gray-300">
            Description:
            <div className="my-4">{product.get('description')}</div>
            <div className="flex items-center py-2 justify-center">
              <button
                type="button"
                onClick={async () => await buyItem(product.get('itemID'), 1, product.get('price'))}
                className="px-4 py-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md md:w-1/3 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Buy: {product.get('price')} AVAX
              </button>
            </div>
            <hr className="my-8 border-gray-400"></hr>
            <h4 className="my-2 font-bond">Changelog</h4>
            <div className="flex flex-col gap-8 px-2 dark:text-gray-400">
              <div>{getChangelog(product)}</div>
            </div>
            <hr className="my-8 border-gray-400"></hr>
            <h4 className="my-2 font-bond">License</h4>
            <div className="flex flex-col gap-8 px-2 dark:text-gray-400">
              <div>{getLicense(product)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
