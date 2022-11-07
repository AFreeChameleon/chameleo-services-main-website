import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../styles/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link 
              href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" 
              rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="/css/root.css"
            />
        </Head>
        <body style={{margin: 0, padding: 0}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const originalRenderPage = ctx.renderPage;

    /* eslint-disable */
    ctx.renderPage = () =>
        originalRenderPage({
        enhanceApp: (App: any) => (props) =>
            <App emotionCache={cache} {...props} />,
        });
    /* eslint-enable */

    const initialProps = await Document.getInitialProps(ctx);

      // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
          ...React.Children.toArray(initialProps.styles),
          ...emotionStyleTags,
        ],
    };
};