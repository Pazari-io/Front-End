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
      'Pazari only takes 7% of every item sale--significantly lower than most other platforms',
    icon: GlobeAltIcon
  },
  {
    name: 'No hidden fees',
    description:
      'There are exactly two kinds of fees on Pazari: Gas fees, and sales tax. Gas fees are charged by the Avalanche network as part of its operation, and sales tax is deducted from every sale. It is impossible to hide any other fees, since Pazari is open-source and community-owned',
    icon: ScaleIcon
  },
  {
    name: 'Transfers are instant',
    description:
      'The Avalanche network that Pazari is built on is capable of sending token transfers and payments in two seconds between Avalanche wallet',
    icon: LightningBoltIcon
  },
  {
    name: 'Mobile notifications',
    description:
      'Get instant notifications whenever you make a sale, gain a level, win an achievement, or reach a new milestone',
    icon: AnnotationIcon
  }
];

export default function About() {
  return (
    <main className="mx-auto dark:bg-gray-900">
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
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-indigo-600 sm:text-4xl">
              A better way to publish and purchase
            </p>
            <div className="flex">
              <Image src={WhyOne}></Image>
              <Image src={WhyTwo}></Image>
            </div>
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
            <div className="mb-10 text-center">
              <h1 className="mb-4 text-3xl font-medium text-center text-gray-900 sm:text-3xl title-font dark:text-indigo-600">
                Frequently Asked Question
              </h1>
            </div>
            <div className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
              <div className="w-full px-4 py-2 lg:w-1/2">
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    What can I sell here?
                  </summary>

                  <span className="text-gray-300">
                    <p className="mt-2 font-medium text-center text-gray-900 sm:text-2xl title-font dark:text-indigo-500">
                      If you can tokenize it, then you can sell it on Pazari!
                    </p>
                    <ul className="list-disc">
                      <li>
                        This is a very broad statement, and intentionally so. Many things can be
                        (and have been) tokenized already that push the limits of what we once
                        thought possible, and every one of those tokens can be sold on Pazari.
                      </li>
                      <li>
                        <div className="mt-6 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          What can be sold on Pazari right away
                        </div>{' '}
                        Ebooks, graphics, game assets, video, audio, and photos.
                      </li>
                      <li>
                        <div className="mt-2 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          What can be sold on Pazari in the future
                        </div>{' '}
                        NFTs, cryptocurrencies, charity donations, fundraiser tokens, initial
                        product offerings, crowd-loan tokens, digital services (think Fiverr),
                        content subscriptions and subscription tokens, streaming services,
                        DRM-protected NFTs, intellectual property, and so on.
                      </li>
                    </ul>
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    How is Pazari different ?
                  </summary>

                  <span className="text-gray-300">
                    <ul className="list-disc">
                      <li>
                        <div className="mt-2 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          For Sellers
                        </div>{' '}
                        Pazari gives its sellers ("Merchants") more power by allowing them to choose
                        their sales tax, and it rewards those who choose to bring in
                        more-than-minimal revenue through a tokenized cash-back system that
                        contributes toward milestones and provides profile boosts.
                      </li>
                      <li>
                        <div className="mt-2 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          For Buyers
                        </div>{' '}
                        We have streamlined the blockchain experience to allow ease of access for
                        all on an otherwise complicated, intimidating, and sometimes dangerous
                        technology
                      </li>
                    </ul>
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    Why should i use Pazari?
                  </summary>

                  <span className="text-gray-300">
                    <ul className="list-disc">
                      <li>
                        <div className="mt-2 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          For Sellers
                        </div>{' '}
                        You keep 95% of all item sales, get paid instantly and on-demand, split your
                        sales with contributors automatically, and you can explore how tokenized
                        content can supercharge your business and future.
                      </li>
                      <li>
                        <div className="mt-2 font-medium text-center text-gray-900 sm:text-xl title-font dark:text-indigo-500">
                          For Buyers
                        </div>{' '}
                        Greater item selection, token holder benefits, and unique and exclusive
                        items.
                      </li>
                    </ul>
                  </span>
                </details>
              </div>
              <div className="w-full px-4 py-2 lg:w-1/2">
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    How do I get paid ?
                  </summary>

                  <span className="text-gray-300">
                    Every time someone buys one of your items you get paid in Magic Internet Money,
                    or MIM, which can be swapped for AVAX and sent to an exchange where it can be
                    sold for your local fiat currency--a process which we make as simple as
                    possible. We use MIM for two reasons:
                    <ul className="list-decimal mt-2">
                      <li>
                        1. MIM is a stablecoin, and isn't subject to price volatility like most
                        cryptocurrencies
                      </li>
                      <li>
                        2. Unlike some big-name stablecoins, MIM cannot be controlled or frozen by
                        any company or government, so there is no risk of your funds ever being
                        frozen or stolen for reasons beyond Pazari's control or knowledge.
                      </li>
                    </ul>
                  </span>
                </details>

                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    But why use crypto?
                  </summary>

                  <span className="text-gray-300">
                    <ul className="list-decimal mt-2">
                      <li>
                        1. Because USD is not programmable, therefore creating an automated system
                        that is capable of paying out multiple recipients *instantly* upon every
                        sale of an item is not only nearly impossible, but crazy complicated and
                        expensive to do using the legacy financial system--and you can forget about
                        cross-border payments entirely.
                      </li>
                      <li>
                        2. Cryptocurrencies can be transferred easily, automatically, and almost
                        instantly with very low fees (depending on the blockchain), and make no
                        distinction between who is receiving it, where they live, or if they even
                        have a bank account.
                      </li>
                      <li>
                        3. "Tokens" are actually a type of NFT, and NFTs can only be transferred
                        over a blockchain network. Given the first two reasons, it only makes sense
                        for Pazari to be a crypto-only Web3 platform
                      </li>
                    </ul>
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="px-4 py-2 font-semibold bg-gray-200 rounded-md dark:bg-indigo-500 dark:text-gray-300">
                    Who runs Pazari?
                  </summary>

                  <span className="text-gray-300">
                    Initially, Pazari is run by the developers who created it, but eventually the
                    protocol will grow large enough to be transitioned to a DAO. Once the Pazari
                    Merchants' DAO has been deployed and goes live the platform will officially be
                    run by the Merchants for whom it was created, and who can call it their home.
                  </span>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>

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
                <h3 className="mb-1 text-lg font-semibold">Q1 - 2022</h3>
                <ul className="w-full leading-tight text-justify">
                  <li>Wrap the alpha version </li>
                  <li>Pazari on social media</li>
                  <li>Deploy functional MVP on Avalanche-C chain testnet</li>
                  <li>Call for investors I</li>
                </ul>
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
                <h3 className="mb-1 text-lg font-semibold">Q2 - 2022</h3>
                <ul className="w-full leading-tight text-justify">
                  <li>Wrap the beta version (engine, frontend, and contract)</li>
                  <li>Deploy beta on Avalanche-C main </li>
                  <li>Call for investors II</li>
                </ul>
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
                <h3 className="mb-1 text-lg font-semibold">Q3 - 2022</h3>
                <ul className="w-full leading-tight text-justify">
                  <li>
                    Pazari limited ERC20 Token for early adapters (publishers, buyers, investors )
                  </li>
                  <li>Wrap the RC version (engine, frontend, and contract)</li>
                  <li>Call for investors III</li>
                </ul>
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
                <h3 className="mb-1 text-lg font-semibold text-gray-50">Q4 - 2022</h3>
                <ul className="w-full leading-tight text-justify">
                  <li>Deploy stable release version</li>
                  <li>Pazari AirDrop</li>
                  <li>Marketing and massive user adoption</li>
                </ul>
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
              <div className="w-full col-start-4 col-end-12 p-4 my-4 mr-auto bg-gray-500 shadow-md rounded-xl">
                <h3 className="mb-1 text-lg font-semibold text-gray-200">2023 and beyond</h3>
                <ul className="w-full leading-tight text-justify">
                  <li>Pazari services</li>
                  <li>Pazari subscriptions</li>
                  <li>Reward top-performing publishers and buyers</li>
                  <li>And much more!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
