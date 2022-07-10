import '../common/styles/globals.css'
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks';
import Navbar from '../common/components/Navbar';
import TopNav from '../common/components/TopNav';
import TwoColumn from '../common/components/TwoColumn';
import { useRouter } from 'next/router'

import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../common/styles/theme';
import createEmotionCache from '../config/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const userData = useUserData();
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={userData}>
          <TopNav path={router.asPath} />
          <TwoColumn>
            <Navbar />
            <Component {...pageProps} />
          </TwoColumn>
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

// for jsx version
// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   emotionCache: PropTypes.object,
//   pageProps: PropTypes.object.isRequired,
// }
