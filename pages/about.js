import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon
} from '@heroicons/react/outline';
import Nav from '../components/NavBar';
import Footer from '../components/Footer';
import Banner from '../public/images/Banner.png';
import WhyOne from '../public/images/WhyOne.png';
import WhyTwo from '../public/images/WhyTwo.png';
import Image from 'next/image';
const navigation = [
  { name: 'Marketplace', href: '#', current: true },
  { name: 'Learn', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  { name: 'About', href: '#', current: false }
];

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon
  }
];

export default function About() {
  return (
    <main className="mx-auto dark:bg-gray-900">
      {/* <Nav /> */}

      {/* <hr className="mx-4 mb-2 border-purple-400 border-dashed " /> */}

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* <div className="lg:text-center">
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-indigo-600 sm:text-4xl">
            Indie publication revolution on avalanche
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
            Empowering the world’s most influential and respected publications
          </p>
        </div> */}
      </div>

      <div className="text-center pt-14">
        <Image
          alt="Banner"
          src={Banner}
          placeholder="blur"
          objectFit={'cover'}
          className="rounded-lg"
        />
      </div>

      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
              Transactions
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-indigo-600 sm:text-4xl">
              A better way to publish and purchase
            </p>
            <div className="flex">
              <Image src={WhyOne}></Image>
              <Image src={WhyTwo}></Image>
            </div>

            <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
              changing fees from 30% to 7%{' '}
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                      <feature.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-300">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div>
        <section className="text-gray-700 bg-gray-300 dark:bg-gray-800">
          <div className="container px-5 py-4 mx-auto ">
            <div className="mb-20 text-center">
              <h1 className="mb-4 text-3xl font-medium text-center text-gray-900 sm:text-3xl title-font dark:text-indigo-600">
                Frequently Asked Question
              </h1>
              <p className="mx-auto text-base leading-relaxed text-gray-400 xl:w-2/4 lg:w-3/4">
                The most common questions about how our business works and what can do for you.
              </p>
            </div>
            <div className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
              <div className="w-full px-4 py-2 lg:w-1/2">
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    What can i sell here?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    How are you diffrent ?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    Why should i use this platform?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>
              </div>
              <div className="w-full px-4 py-2 lg:w-1/2">
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    How do i get paid ?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    Can I blah blah?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    Can I blah blah?
                  </summary>

                  <span className="text-gray-300">
                    Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute
                    deserunt esse ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa
                    magna in aute.
                  </span>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <hr className="mx-4 mb-2 border-purple-400 border-dashed " /> */}

      <div className="p-2 mt-2 bg-white dark:bg-gray-900">
        <h1 className="mb-2 text-3xl font-semibold text-center dark:text-indigo-500">Road Map</h1>
        <div className="container ">
          <div className="flex flex-col grid-cols-12 md:grid text-gray-50">
            <div className="flex md:contents">
              <div className="relative col-start-2 col-end-4 mr-10 md:mx-auto">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-green-600 pointer-events-none"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 text-center bg-green-600 rounded-full shadow top-1/2">
                  <i className="text-white fas fa-check-circle"></i>
                </div>
              </div>
              <div className="w-full col-start-4 col-end-12 p-4 my-4 mr-auto bg-green-600 shadow-md rounded-xl">
                <h3 className="mb-1 text-lg font-semibold">Package Booked</h3>
                <p className="w-full leading-tight text-justify">21 July 2021, 04:30 PM</p>
              </div>
            </div>

            <div className="flex md:contents">
              <div className="relative col-start-2 col-end-4 mr-10 md:mx-auto">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-green-600 pointer-events-none"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 text-center bg-green-600 rounded-full shadow top-1/2">
                  <i className="text-white fas fa-check-circle"></i>
                </div>
              </div>
              <div className="w-full col-start-4 col-end-12 p-4 my-4 mr-auto bg-green-600 shadow-md rounded-xl">
                <h3 className="mb-1 text-lg font-semibold">Out for Delivery</h3>
                <p className="leading-tight text-justify">22 July 2021, 01:00 PM</p>
              </div>
            </div>

            <div className="flex md:contents">
              <div className="relative col-start-2 col-end-4 mr-10 md:mx-auto">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-yellow-600 pointer-events-none"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 text-center bg-yellow-600 rounded-full shadow top-1/2">
                  <i className="text-white fas fa-times-circle"></i>
                </div>
              </div>
              <div className="w-full col-start-4 col-end-12 p-4 my-4 mr-auto bg-yellow-600 shadow-md rounded-xl">
                <h3 className="mb-1 text-lg font-semibold text-gray-50">Add XXX</h3>
                <p className="leading-tight text-justify">22 July 2021, 09:00 PM</p>
              </div>
            </div>

            <div className="flex md:contents">
              <div className="relative col-start-2 col-end-4 mr-10 md:mx-auto">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 text-center bg-gray-400 rounded-full shadow top-1/2">
                  <i className="text-gray-400 fas fa-exclamation-circle"></i>
                </div>
              </div>
              <div className="w-full col-start-4 col-end-12 p-4 my-4 mr-auto bg-gray-400 shadow-md rounded-xl">
                <h3 className="mb-1 text-lg font-semibold text-gray-200">Delivered</h3>
                <p className="leading-tight text-justify text-gray-200">29 July 2021, 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}
