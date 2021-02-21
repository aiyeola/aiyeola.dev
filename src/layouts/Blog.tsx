import * as React from "react";
import { parseISO, format as formatDate } from "date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useSWR from "swr";
import format from "comma-number";

import fetcher from "@lib/fetcher";
import LayoutContainer from "@layouts/Container";
import { WEBSITE_URL } from "@utils/config";
import Subscribe from "@components/Subscribe";

type FrontMatter = {
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
  wordCount: number;
  readingTime: ReadingTime;
  slug: string;
};

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export default function BlogLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode | object;
  frontMatter: FrontMatter;
}) {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const { data } = useSWR(`/api/views/${frontMatter.slug}`, fetcher);
  const views = data?.total;

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${frontMatter.slug}`, {
        method: "POST",
      });

    registerView();
  }, [frontMatter.slug]);

  return (
    <LayoutContainer
      title={`${frontMatter.title} – Victor Aiyeola`}
      description={frontMatter.summary}
      image={`${WEBSITE_URL}${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <Grid item>
        <Typography variant="h1" style={{ lineHeight: 1 }} paragraph>
          {frontMatter.title}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction={matchesXS ? "column" : "row"}
        justify={matchesXS ? undefined : "space-between"}
        style={{ marginBottom: matchesXS ? 0 : "1rem" }}
      >
        <Grid
          item
          style={{
            marginBottom: matchesXS ? "0.4rem" : 0,
          }}
        >
          <Typography variant="subtitle2">
            {"Victor Aiyeola / "}
            {formatDate(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {frontMatter.readingTime.text}
            {` • `}
            {`${views ? format(views) : "–––"} views`}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>{children}</Grid>

      <Grid
        item
        style={{
          marginTop: "1rem",
        }}
      >
        <Subscribe />
      </Grid>
    </LayoutContainer>
  );
}
