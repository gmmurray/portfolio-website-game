import '../styles/globals.scss';
import 'sweetalert2/src/sweetalert2.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio Game - Greg Murray</title>
        <meta
          name="description"
          content="Play the game version of my portfolio website!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
