import Head from "next/head";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

const ToolbarMargin = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3.3em",
  [theme.breakpoints.down("md")]: {
    marginBottom: "2.3em",
  },
  [theme.breakpoints.down("xs")]: {
    marginBottom: "1.25em",
  },
}));

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
};

export default function Container(props: Props) {
  const router = useRouter();

  const { children, ...customProps } = props;

  const customMeta = {
    ...customProps,
  };

  const meta = {
    title: "Victor Aiyeola - Frontend Engineer",
    description: "Javascript frontend engineer",
    image: "http://www.aiyeola.dev/static/images/banner-black.png",
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="keywords"
          content="victor, aiyeola, developer, personal website, blog, javascript, typescript"
        />
        <meta name="author" content="Victor Aiyeola" />
        <meta name="description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://aiyeola.dev${router.asPath}`}
        />
        <link rel="canonical" href={`https://aiyeola.dev${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content="Victor Aiyeola" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@victor_aiyeola" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <Header />
        <ToolbarMargin />

        <Grid
          container
          direction="column"
          sx={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginTop: "1rem",
            marginBottom: "2rem",
            alignItems: "center",
          }}
        >
          <Grid
            container
            direction="column"
            sx={(theme) => ({
              maxWidth: "46rem",
              width: "100%",
              [theme.breakpoints.down("xs")]: {
                maxWidth: "100vw",
                width: "100%",
              },
            })}
          >
            {children}
          </Grid>

          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
