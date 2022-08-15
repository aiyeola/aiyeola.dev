import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "46rem !important",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100vw",
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3.3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2.3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
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
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const router = useRouter();

  const { children, ...customProps } = props;

  const customMeta = {
    ...customProps,
  };

  const meta = {
    title: "Victor Aiyeola – Software Developer, BI developer",
    description:
      "Javascript software developer, Business intelligence developer.",
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
        justifyContent="center"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className={classes.toolbarMargin} />
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          sx={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Grid
            item
            container
            direction="column"
            sx={{
              maxWidth: matchesXS ? "46rem" : "100vw",
            }}
          >
            {children}
          </Grid>

          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
