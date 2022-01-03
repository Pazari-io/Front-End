import PageTypes from '../pageTypes.js';

const audioUrls = [
  'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
  'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
];



export default function Home() {
  return <PageTypes audioUrls={audioUrls}/>

}
