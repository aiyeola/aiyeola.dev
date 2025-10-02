import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { CacheProvider, EmotionCache } from "@emotion/react";
import "nprogress/nprogress.css";
import CssBaseline from "@mui/material/CssBaseline";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";
import useDarkMode from "use-dark-mode";

import "styles/global.css";
import { darkTheme, lightTheme } from "src/theme";
import MDXComponentsConfig from "@components/MDXComponents";
import "@lib/firebaseClient";
import createEmotionCache from "src/createEmotionCache";

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false }
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
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
        <MDXProvider components={MDXComponentsConfig}>
          <CssBaseline />
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
