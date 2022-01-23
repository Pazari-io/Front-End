import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Verified from '../public/images/Verified.png';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#eee',
  progressColor: '#0178FF',
  cursorColor: 'OrangeRed',
  barWidth: 4,
  barRadius: 4,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true
});

export default function AudioPlayer(props) {
  // let urls = props.audioUrls;

  // TODO get these from props/DB
  // TODO Pagination

  const audioUrls = [
    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/scott-joplin-the-cascades.mp3',
      title: 'The cascades',
      author: 'Scott Joplin',
      priceUsd: 100,
      BPM: 40,
      duration: 2.34
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/silent-night.mp3',
      title: 'Silent night',
      author: 'Scott Joplin',
      priceUsd: 120,
      BPM: 110,
      duration: 2.34
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3',
      title: 'nocturne-op9-no2',
      author: 'Chopin',
      priceUsd: 100,
      BPM: 70,
      duration: 3.22
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/scott-joplin-the-cascades.mp3',
      title: 'The cascades',
      author: 'Scott Joplin',
      priceUsd: 200,
      BPM: 90,
      duration: 1.34
    }
  ];

  const waveformRef = useRef([]);
  const wavesurfer = useRef([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current[0]) {
        for (let i = 0; i < audioUrls.length; i++) wavesurfer.current[i].destroy();
      }
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //console.log(isLoading);
  }, [isLoading]);
  const Loaded = () => {
    setIsLoading(false);
  };

  const create = async () => {
    const WaveSurfer = (await import('wavesurfer.js')).default;

    for (let i = 0; i < audioUrls.length; i++) {
      const options = formWaveSurferOptions(waveformRef.current[i]);
      wavesurfer.current[i] = WaveSurfer.create(options);
      wavesurfer.current[i].load(audioUrls[i].url);
      if (i === audioUrls.length - 1) {
        wavesurfer.current[i].on('ready', () => {
          Loaded();
        });
      }
    }
  };

  const handlePlayPause = async (index) => {
    console.log(wavesurfer.current[index]);
    setPlaying(!playing);
    wavesurfer.current[index].playPause();
  };

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
            disabled="">
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </button>
        </div>
      )}

      <div className=" audio-player">
        {audioUrls.map((audio, index) => {
          return (
            <div key={index}>
              <div
                className={'w-full '}
                id={'wave-' + index}
                ref={(element) => {
                  waveformRef.current[index] = element;
                }}>
                <div className={'controls'}>
                  <button
                    className="w-20 px-2 mx-4 my-4 bg-gray-300 rounded-lg dark:bg-gray-800 dark:text-indigo-600"
                    id={index}
                    onClick={() => handlePlayPause(index)}>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="px-1">/</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className={'flex items-center justify-between'}>
                  <div>
                    <h3 className="px-2 text-xl font-bold">{audio.title}</h3>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center justify-center mx-4">
                      <span className="flex items-center px-1 text-lg dark:text-gray-300">
                        {audio.author}
                      </span>

                      {/* {profile.get('level') === 3 ? <Image src={Verified} height={20} width={20} /> : ''} */}
                      <Image src={Verified} height={20} width={20} />
                    </div>
                    <div>
                      <Link href="/publishers/details/4">
                        <a>
                          <img
                            src="https://www.pikpng.com/pngl/m/382-3822530_j-k-rowling-blond-clipart.png"
                            className="w-10 h-10 rounded-full"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="font-bold">BMP : {audio.BPM}</div>

                  <div className="font-bold">Duration : {audio.duration}</div>

                  <div className="flex items-center">
                    <img
                      className="w-6 h-6"
                      src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"></img>
                    <h3 className="px-2 text-xl font-bold">${audio.priceUsd}</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
