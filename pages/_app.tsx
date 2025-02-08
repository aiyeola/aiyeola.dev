import React, { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import { ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import useDarkMode from "use-dark-mode";

import "styles/global.css";
import { darkTheme, lightTheme } from "src/theme";
import MDXComponents from "@components/MDXComponents";
import "@lib/firebaseClient";

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false },
);

function App({ Component, pageProps }: AppProps) {
  const { value: isDark } = useDarkMode(true);

  const themeConfig = isDark
    ? responsiveFontSizes(darkTheme)
    : responsiveFontSizes(lightTheme);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <TopProgressBar />
      <ThemeProvider theme={themeConfig}>
        <MDXProvider components={MDXComponents as MDXProviderComponents}>
          {/* <MDXProvider components={MDXComponents}> */}
          <CssBaseline />
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
