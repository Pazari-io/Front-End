import Link from 'next/link';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';
import Verified from '../public/images/Verified.png';
import { weiToEther } from './EtherUtils';

const LoadCover = (props) => {
  if (!props.previewUrl || props.previewUrl == '') {
    return null;
  }

  switch (props.type) {
    case 'book':
      return (
        <div>
          <img className="object-cover w-full h-full " src={props.previewUrl} alt="" />
        </div>
      );
    case 'audio':
      return <AudioPlayer audioUrls={props.audioUrls} />;

    case 'video':
      return (
        <video
          muted={true}
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
          className="object-cover w-full h-full "
          src={props.previewUrl}
          type="video/mp4"></video>
      );
    case 'photo':
    case 'game':
    case 'graphic':
      return (
        <div>
          <img className="object-cover w-full h-full " src={props.previewUrl} alt="" />
        </div>
      );
    default:
      return null;
  }
};

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

  return (
    <div className="flex items-center p-4 text-sm text-gray-600">
      {res}
      <span className="ml-2 text-gray-200">34 verfied review</span>
    </div>
  );
}

function generateItem(item, profile, props) {
  return (
    <span className="block overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-300 c-card hover:shadow-xl">
      <Link href={`/products/details/` + item.id}>
        <a className="cursor-pointer">
          <div className="relative overflow-hidden">
            <LoadCover previewUrl={item.get('previewUrl')} type={props.type} />
          </div>
        </a>
      </Link>
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-indigo-800 uppercase bg-indigo-200 rounded-full">
          New
        </span>
        <h2 className="mt-2 mb-2 font-bold">{item.get('title')}</h2>
        <p className="text-sm">{item.get('description')}</p>
        <div className="flex items-center justify-between mt-3">
          {/* <div>
            <span className="text-lg font-bold dark:text-indigo-600">
              Item {item.get('itemID')}
            </span>
            &nbsp;
            <span className="text-sm font-semibold dark:text-indigo-600">$</span>
          </div> */}

          <div className="flex items-center">
            <img
              className="w-6 h-6"
              alt="MIM"
              src="https://assets.coingecko.com/coins/images/16786/small/mimlogopng.png?1624979612"></img>
            <h3 className="px-2 text-lg font-bold">{weiToEther(item.get('price'))}</h3>
          </div>
        </div>
      </div>
      <div className="p-4 text-xs text-gray-700 border-t border-b">
        <span className="flex items-center mb-1 dark:text-gray-300">
          #Ebook #Asset #Audio #{props.type}
        </span>
      </div>
      {displayStars()}

      <div className="flex items-center justify-between p-4 text-xs text-gray-700 border-t ">
        <div className="flex items-center">
          <span className="flex items-center px-2 dark:text-gray-300">
            {profile.get('username')}
          </span>
          {profile.get('level') === 3 ? <Image src={Verified} height={20} width={20} /> : ''}
        </div>
        <Link href="/publishers/details/4">
          <a>
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
          </a>
        </Link>
      </div>
    </span>
  );
}

function getItems(props) {
  let profile = props.item.get('profile');
  if (!profile) {
    profile = new Map();
  }
  let res = generateItem(props.item, profile, props);
  return <div className="w-full">{res}</div>;
}

export default function Card(props) {
  return <div>{getItems(props)}</div>;
}
