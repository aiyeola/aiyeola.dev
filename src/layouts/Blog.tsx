import * as React from "react";
import { parseISO, format as formatDate } from "date-fns";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import format from "comma-number";
import { DiscussionEmbed } from "disqus-react";

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
      <Grid>
        <Typography variant="h3" sx={{ lineHeight: 1.4 }} paragraph>
          {frontMatter.title}
        </Typography>
      </Grid>
      <Grid
        container
        direction={matchesXS ? "column" : "row"}
        justifyContent={matchesXS ? undefined : "space-between"}
        sx={{ marginBottom: "2rem" }}
      >
        <Grid
          sx={{
            marginBottom: matchesXS ? "0.4rem" : 0,
          }}
        >
          <Typography variant="subtitle2">
            {"Victor Aiyeola / "}
            {formatDate(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">
            {frontMatter.readingTime.text}
            {` • `}
            {`${views ? format(views) : "–––"} views`}
          </Typography>
        </Grid>
      </Grid>

      <Grid>{children as React.ReactNode}</Grid>

      <Grid
        sx={{
          marginTop: "1rem",
        }}
      >
        <Subscribe />
      </Grid>

      <Grid
        sx={{
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <DiscussionEmbed
          shortname="aiyeola"
          config={{
            url: `${WEBSITE_URL}/blog/${frontMatter.slug}`,
            identifier: frontMatter.slug,
            title: frontMatter.title,
          }}
        />
      </Grid>
    </LayoutContainer>
  );
}
