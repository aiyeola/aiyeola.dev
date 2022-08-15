import * as React from "react";
import { parseISO, format } from "date-fns";
import Grid from "@mui/material/Grid";
import Text from "@components/MuiComposed/Text";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export default function NewsletterLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode;
  frontMatter: FrontMatter;
}) {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <LayoutContainer
      title={`${frontMatter.title} – Victor Aiyeola`}
      description={frontMatter.summary}
      image={`${WEBSITE_URL}${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <Grid item>
        <Text variant="h3" style={{ lineHeight: 1 }} paragraph>
          {frontMatter.title}
        </Text>
      </Grid>
      <Grid
        item
        container
        direction={matchesXS ? "column" : "row"}
        justifyContent={matchesXS ? undefined : "space-between"}
        style={{ marginBottom: matchesXS ? 0 : "1rem" }}
      >
        <Grid
          item
          style={{
            marginBottom: matchesXS ? "0.4rem" : 0,
          }}
        >
          <Text variant="subtitle2">
            {"Victor Aiyeola / "}
            {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
          </Text>
        </Grid>
        <Grid item>
          <Text variant="subtitle2">
            {frontMatter.readingTime.text}
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
    </LayoutContainer>
  );
}
