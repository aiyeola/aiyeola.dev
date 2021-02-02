import Head from "next/head";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "42rem",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100vw",
    },
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function Container(props: Props) {
  const classes = useStyles();

  const router = useRouter();

  const { children, ...customMeta } = props;

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
        <meta property="og:site_name" content="Victor Aiyeola" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
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
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Header />
          <Grid item container direction="column" className={classes.container}>
            {children}
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
