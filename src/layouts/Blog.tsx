import * as React from "react";
import { parseISO, format as formatDate } from "date-fns";
import Grid from "@mui/material/Grid";
import Text from "@components/MuiComposed/Text";
import { useTheme } from '@mui/material/styles';
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
  children: React.ReactNode;
  frontMatter: FrontMatter;
}) {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Text variant="h3" style={{ lineHeight: 1.4 }} paragraph>
          {frontMatter.title}
        </Text>
      </Grid>
      <Grid
        item
        container
        direction={matchesXS ? "column" : "row"}
        justifyContent={matchesXS ? undefined : "space-between"}
        style={{ marginBottom: "2rem" }}
      >
        <Grid
          item
          style={{
            marginBottom: matchesXS ? "0.4rem" : 0,
          }}
        >
          <Text variant="subtitle2">
            {"Victor Aiyeola / "}
            {formatDate(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
          </Text>
        </Grid>
        <Grid item>
          <Text variant="subtitle2">
            {frontMatter.readingTime.text}
            {` • `}
            {`${views ? format(views) : "–––"} views`}
          </Text>
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

      <Grid
        item
        style={{
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
