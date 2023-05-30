import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import createEmotionCache from '@/functions/createEmotionCache';
import {EmotionCache} from '@emotion/css';
import {CacheProvider} from '@emotion/react';
import Head from 'next/head';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '@/functions/theme';
import MainProvider from '@/context/MainProvider';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache,
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Virtualica</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <MainProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </MainProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
