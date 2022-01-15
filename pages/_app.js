import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_ID}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </MoralisProvider>
  );
}
