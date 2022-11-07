import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import createEmotionCache from '../styles/createEmotionCache';
import lightThemeOptions from '../styles/lightThemeOptions';

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <React.Fragment>
            <Head>
                <title>Chameleo Services</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};