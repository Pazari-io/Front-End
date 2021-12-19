import { useState, useRef, useEffect } from 'react';

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

  const waveformRef = useRef([]);
  const wavesurfer = useRef([]);
  const [playing, setPlaying] = useState(false);

  const urls = [
    'https://www.mfiles.co.uk/mp3-downloads/scott-joplin-the-cascades.mp3',
    'https://www.mfiles.co.uk/mp3-downloads/silent-night.mp3',
    'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3',
    'https://www.mfiles.co.uk/mp3-downloads/Toccata-and-Fugue-Dm.mp3'
  ];
  //console.log(urls);

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current[0]) {
        for (let i = 0; i < urls.length; i++) wavesurfer.current[i].destroy();
      }
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  const Loaded = async () => {
    setIsLoading(false);
  };

  const create = async () => {
    const WaveSurfer = (await import('wavesurfer.js')).default;

    for (let i = 0; i < urls.length; i++) {
      const options = formWaveSurferOptions(waveformRef.current[i]);
      wavesurfer.current[i] = WaveSurfer.create(options);
      wavesurfer.current[i].load(urls[i]);
      if (i === urls.length - 1) {
        wavesurfer.current[i].on('ready', () => {
          Loaded();
        });
      }
    }
  };

  const handlePlayPause = async (index) => {
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
        {urls.map((_, index) => {
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
                    className="w-12 px-2 mx-4 my-4 bg-gray-300 rounded-lg dark:bg-gray-800 dark:text-indigo-600"
                    id={index}
                    onClick={() => handlePlayPause(index)}>
                    Play
                  </button>
                </div>
                <div className={'flex items-center justify-between'}>
                  <div>
                    <h3 className="px-2 text-xl font-bold">Toccata and Fugue</h3>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="w-6 h-6"
                      src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"></img>
                    <h3 className="px-2 text-xl font-bold">0.454 - $100</h3>
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
