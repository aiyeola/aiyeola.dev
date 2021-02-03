import React, { useEffect } from "react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MDXProvider } from "@mdx-js/react";

import "../styles/global.css";
import theme from "src/theme";
import ThemeProvider from "@utils/dark-mode";
import MDXComponents from "@components/MDXComponents";

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false },
);

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <TopProgressBar />
      <ThemeProvider theme={theme}>
        <MDXProvider components={MDXComponents}>
          <CssBaseline />
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
