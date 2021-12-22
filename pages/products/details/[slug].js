import Nav from '../../../components/NavBar';
import ProductDetail from '../../../components/ProductDetail';
import Footer from '../../../components/Footer';
import { Tab } from '@headlessui/react';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Detail() {
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

  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />

      <div className="flex items-start">
        <div className="w-full py-10 rounded-lg md:w-1/2 px-14">
          <ProductDetail />
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
        <div className="w-full py-10 md:w-1/2 px-14">
          <div className="flex items-center justify-between mb-10 ">
            <div>
              <h1 className="text-3xl font-bold dark:text-indigo-400">The true beauty </h1>
            </div>
            <div>
              <h3 className="mx-2 mt-2 text-xl dark:text-gray-300">by author</h3>
            </div>
            <div className="flex">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-current">
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-current">
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-current">
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-current">
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-current">
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
            </div>
          </div>
          <div className="dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mihi quidem Antiochum, quem
            audis, satis belle videris attendere. Quae enim adhuc protulisti, popularia sunt, ego
            autem a te elegantiora desidero. Sed non alienum est, quo facilius vis verbi
            intellegatur, rationem huius verbi faciendi Zenonis exponere. Hanc quoque iucunditatem,
            si vis, transfer in animum; Confecta res esset. Quae tamen a te agetur non melior, quam
            illae sunt, quas interdum optines.
            <div class="aspect-w-16 aspect-h-9 my-2">
              <iframe
                src="https://www.youtube.com/embed/r9jwGansp1E"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
            <div className="flex items-center justify-between py-2">
              <button
                type="button"
                class="py-4 px-4  w-1/3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Buy A Copy $300
              </button>
              <button
                type="button"
                class="py-4 mx-1 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/3 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Buy And Bang $30000
              </button>
            </div>
            <hr className="my-8 border-gray-400"></hr>
            <h4 className="my-2 font-bond">Higlights</h4>
            <div class="flex px-2 flex-col gap-8 dark:text-gray-400">
              <div>
                <ul class="list-disc list-inside text-normal text-gray-900 dark:text-gray-500">
                  <li>Now this is a story all about how, my life got flipped turned upside down</li>
                  <li>And I like to take a minute and sit right here</li>
                  <li>I'll tell you how I became the prince of a town called Bel-Air </li>
                </ul>
              </div>
            </div>
            <hr className="my-8 border-gray-400"></hr>
            <h4 className="my-2 font-bond">License</h4>
            <div class="flex px-2 flex-col gap-8 dark:text-gray-400">
              <div>
                <ul class="list-disc list-inside text-normal text-gray-900 dark:text-gray-500">
                  <li>personal , professional and exclusive copies avaiable. </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
