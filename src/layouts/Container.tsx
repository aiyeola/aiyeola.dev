import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "46rem",
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

  const router = useRouter();

  const { children, ...customProps } = props;

  const customMeta = {
    ...customProps,
  };

  const meta = {
    title: "Victor Aiyeola – Software Developer",
    description: "Personal website and blog",
    image: "https://aiyeola.dev/static/images/banner.png",
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://aiyeola.dev${router.asPath}`}
        />
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
        justify="center"
        style={{
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
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Grid item container direction="column" className={classes.container}>
            {children}
          </Grid>

          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
