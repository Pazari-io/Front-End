import Head from 'next/head'
import Image from 'next/image'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import useDarkMode from '../hooks/useDarkMode'
import Link from 'next/link'
import { useRouter } from "next/router";
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import Nav from '../components/NavBar'

const navigation = [
  { name: 'Marketplace', href: '#', current: true },
  { name: 'Learn', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  { name: 'About', href: '#', current: false },
]

// const navigation = [
//   { name: 'Marketplace', href: '/' },
//   { name: 'Learn Here', href: '/story' },
//   { name: 'About', href: '/about' },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
]



export default function About() {
  const [colorTheme, setTheme] = useDarkMode();
  const router = useRouter();

 
  return (
    <div className="dark:bg-gray-900">
     
    <Nav/>

     <div className="relative bg-white dark:bg-gray-900 overflow-hidden ">
      <div className="max-w-full  mx-auto bg-gray-300 dark:bg-gray-900 ">
        <div className="relative z-10 pb-8 pt-4 dark:bg-gray-900 bg-gray-300 roundled-lg   sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 dark:bg-gray-900 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon className="dark:text-gray-900"  points="50,0 100,0 50,100 0,100" />
          </svg> */}


          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
            <div className="sm:text-center lg:text-left ">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-indigo-600 xl:inline">Publication revolution on avalanche</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      We plan to change the way publication works 
                    by working on the future join us.
                 
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  {/* <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Our Story
                  </a> */}
                </div>
           
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-full  mb-2">
        <img
          className="h-56 z-4 w-full object-cover sm:h-72 md:h-96  rounded-lg lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1542856809-e1230214be24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2688&q=80"
          alt=""
        />
      </div>
    </div>


    <hr className="border-dashed border-purple-400 mx-4 mb-2 " />
   
   
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-indigo-600 sm:text-4xl">
            A better way to publish and purchase  
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          changing fees from 30% to 3% </p>
             
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
   
    <hr className="border-dashed border-purple-400 mx-4 mb-2 " />


  <div>
      <section className="text-gray-700">
        <div className="container px-5 py-4 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-3xl font-medium text-center title-font text-gray-900 dark:text-indigo-600 mb-4">
              Frequently Asked Question
            </h1>
            <p className="text-base text-gray-400  leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              The most common questions about how our business works and what
              can do for you.
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="w-full lg:w-1/2 px-4 py-2">
            <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                  What can i sell here?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details>
              
             
             
              <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                  How are you diffrent ?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details>

                <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                 Why should i use this platform?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details>

            </div>
            <div className="w-full lg:w-1/2 px-4 py-2">
          

              <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                  How do i get paid ?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details>
              
              <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                  Can I blah blah?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details>
                <details className="mb-4">
                <summary className="font-semibold bg-gray-200 dark:bg-indigo-500  dark:text-gray-300 rounded-md py-2 px-4">
                  Can I blah blah?
                </summary>

                <span className="text-gray-300">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit nostrud pariatur culpa magna in aute.
                </span>
              </details> 
             
            </div>
          </div>
        </div>
      </section>
    </div>


    <hr className="border-dashed border-purple-400 mx-4 mb-2 " />

    <div className="p-2 mt-2 bg-gray-300 dark:bg-gray-900">
    <h1 className="text-3xl text-center font-semibold dark:text-indigo-500 mb-2">Road Map</h1>
    <div className="container ">
      <div className="flex flex-col md:grid grid-cols-12 text-gray-50">

        <div className="flex md:contents">
          <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-green-600 pointer-events-none"></div>
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-600 shadow text-center">
              <i className="fas fa-check-circle text-white"></i>
            </div>
          </div>
          <div className="bg-green-600 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 className="font-semibold text-lg mb-1">Package Booked</h3>
            <p className="leading-tight text-justify w-full">
              21 July 2021, 04:30 PM
            </p>
          </div>
        </div>

        <div className="flex md:contents">
          <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-green-600 pointer-events-none"></div>
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-600 shadow text-center">
              <i className="fas fa-check-circle text-white"></i>
            </div>
          </div>
          <div className="bg-green-600 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 className="font-semibold text-lg mb-1">Out for Delivery</h3>
            <p className="leading-tight text-justify">
              22 July 2021, 01:00 PM
            </p>
          </div>
        </div>

        <div className="flex md:contents">
          <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-yellow-600 pointer-events-none"></div>
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-yellow-600 shadow text-center">
              <i className="fas fa-times-circle text-white"></i>
            </div>
          </div>
          <div className="bg-yellow-600 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 className="font-semibold text-lg mb-1 text-gray-50">Add XXX</h3>
            <p className="leading-tight text-justify">
            22 July 2021, 09:00 PM

            </p>
          </div>
        </div>

        <div className="flex md:contents">
          <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-400 shadow text-center">
              <i className="fas fa-exclamation-circle text-gray-400"></i>
            </div>
          </div>
          <div className="bg-gray-400 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 className="font-semibold text-lg mb-1 text-gray-200">Delivered</h3>
            <p className="leading-tight text-gray-200 text-justify">
            29 July 2021, 11:00 PM

            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
  
    </div>
  )
}
