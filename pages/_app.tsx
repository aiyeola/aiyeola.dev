import React, { useMemo } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { CacheProvider, EmotionCache } from "@emotion/react";
import "nprogress/nprogress.css";
import CssBaseline from "@mui/material/CssBaseline";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "styles/global.css";
import { darkTheme, lightTheme } from "src/theme";
import MDXComponentsConfig from "@components/MDXComponents";
import "@lib/firebaseClient";
import createEmotionCache from "src/createEmotionCache";
import { useTheme as useNextTheme } from "next-themes";

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false },
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme which is the actual theme being used (handles 'system' automatically)
  // Default to dark theme during SSR to match defaultTheme
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const themeConfig = useMemo(
    () => responsiveFontSizes(isDark ? darkTheme : lightTheme),
    [isDark],
  );

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <NextThemesProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="theme-preference"
      >
        <ThemeWrapper>
          <TopProgressBar />
          <MDXProvider components={MDXComponentsConfig}>
            <Component {...pageProps} />
          </MDXProvider>
        </ThemeWrapper>
      </NextThemesProvider>
    </CacheProvider>
  );
}

export default App;
