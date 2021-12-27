import Link from 'next/link';
import Image from 'next/image';
const LoadCover = (props) => {
  switch (props.type) {
    case 'book':
      return (
        <div>
          <img
            className="object-cover w-full h-full "
            src="https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format"
            alt=""
          />
        </div>
      );
    case 'video':
      return (
        <video
          muted={true}
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
          className="object-cover w-full h-full "
          src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4"
          type="video/mp4"></video>
      );
    case 'photo':
      return (
        <div>
          <img
            className="object-cover w-full h-full "
            src="https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg"
            alt=""
          />
        </div>
      );
    default:
      return null;
  }
};

export default function Card(props) {
  return (
    <div>
      <div className="w-full">
        <span className="block overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-300 c-card hover:shadow-xl">
          <Link href={`/products/details/${Math.random(1, 9999999999)}`}>
            <a className="cursor-pointer">
              <div className="relative overflow-hidden">
                <LoadCover type={props.type} />
              </div>
            </a>
          </Link>
          <div className="p-4">
            <span className="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-indigo-800 uppercase bg-indigo-200 rounded-full">
              New
            </span>
            <h2 className="mt-2 mb-2 font-bold">Purus Ullamcorper Inceptos Nibh</h2>
            <p className="text-sm">
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla
              non metus auctor fringilla.
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-lg font-bold dark:text-indigo-600">45,00</span>&nbsp;
                <span className="text-sm font-semibold dark:text-indigo-600">$</span>
              </div>

              <div className="flex items-center">
                <img
                  className="w-6 h-6"
                  src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"></img>
                <h3 className="px-2 text-lg font-bold">0.454</h3>
              </div>
            </div>
          </div>
          <div className="p-4 text-xs text-gray-700 border-t border-b">
            <span className="flex items-center mb-1 dark:text-gray-300">
              #Ebook #Asset #Audio #Video
            </span>
          </div>
          <div className="flex items-center p-4 text-sm text-gray-600">
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
              className="w-4 h-4 fill-current">
              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
            </svg>
            <span className="ml-2 text-gray-200">34 verfied review</span>
          </div>

          <div className="flex items-center justify-between p-4 text-xs text-gray-700 border-t ">
            <div className="flex items-center">
              <span className="flex items-center dark:text-gray-300">Verifed Author</span>

              <img
                src="https://verified-badge.vedb.me/wp-content/uploads/2020/07/Facebook-Logo-Verified-Badge-PNG.png"
                className="w-4 h-4 mx-1 rounded-full"
              />
            </div>
            <Link href="/publishers/details/4">
              <a>
                <img
                  src="https://www.pikpng.com/pngl/m/382-3822530_j-k-rowling-blond-clipart.png"
                  className="w-10 h-10 rounded-full"
                />
              </a>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
}
