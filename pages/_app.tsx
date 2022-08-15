import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import useDarkMode from "use-dark-mode";

import "styles/global.css";
import { darkTheme, lightTheme } from "src/theme";
import MDXComponents from "@components/MDXComponents";
import { NextPageWithLayout } from "types/index";
import "@lib/firebaseClient";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false },
);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type Props = {
  Component: NextPageWithLayout;
  pageProps: any;
} & MyAppProps;

function App(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { value: isDark } = useDarkMode(true);

  const themeConfig = isDark
    ? responsiveFontSizes(darkTheme)
    : responsiveFontSizes(lightTheme);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <TopProgressBar />
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        <MDXProvider components={MDXComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
