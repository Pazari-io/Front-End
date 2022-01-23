import Image from 'next/image';

import LoadingImage from '../public/images/Loading.png';

const makeThreeSkeletonCard = () => {
  const CardSkeletion = () => {
    return (
      <div className="w-1/3 mx-2 bg-white rounded shadow-2xl dark:bg-gray-700">
        <div className="bg-gray-200 rounded-tl rounded-tr h-80 animate-pulse"></div>
        <div className="p-5">
          <div className="h-6 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
          <div className="grid grid-cols-4 gap-1">
            <div className="h-4 col-span-3 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 col-span-3 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 col-span-2 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };

  let card = [...Array(3)].map((_, index) => <CardSkeletion id={index + 1} key={index} />);

  return card;
};
export const Loading = (props) => {
  switch (props.type) {
    case 'full':
      return (
        <div className="fixed top-0 left-0 z-50 block w-full h-full bg-white opacity-75 dark:bg-black">
          <span className="relative flex items-center justify-center opacity-1 my-14 animate-pulse">
            <Image src={LoadingImage} width={450} height={500} />
          </span>
        </div>
      );

    case 'category':
      return <div className="flex justify-center">{makeThreeSkeletonCard()}</div>;
  }
};
