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
    'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
    'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  ];
  console.log(urls);

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current[0]) {
        for (let i = 0; i < urls.length; i++) wavesurfer.current[i].destroy();
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import('wavesurfer.js')).default;

    for (let i = 0; i < urls.length; i++) {
      const options = formWaveSurferOptions(waveformRef.current[i]);
      wavesurfer.current[i] = WaveSurfer.create(options);
      wavesurfer.current[i].load(urls[i]);
    }
  };

  const handlePlayPause = (index) => {
    setPlaying(!playing);

    wavesurfer.current[index].playPause();
  };

  return (
    <div className="audio-player">
      {urls.map((_, index) => {
        return (
          <div
            className="w-full"
            id={'wave-' + index}
            key={index}
            ref={(element) => {
              waveformRef.current[index] = element;
            }}>
            <div className="controls">
              <button
                className="w-12 px-2 mx-4 my-4 bg-gray-300 rounded-lg dark:bg-gray-800 dark:text-indigo-600"
                id={index}
                onClick={() => handlePlayPause(index)}>
                Play
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
