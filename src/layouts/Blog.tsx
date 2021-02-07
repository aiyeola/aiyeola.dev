import * as React from "react";
import { parseISO, format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LayoutContainer from "@layouts/Container";
import { WEBSITE_URL} from '@utils/config'

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
        justify="space-between"
        style={{ marginBottom: "2rem" }}
      >
        <Grid item>
          <Typography variant="subtitle1">
            {"Victor Aiyeola / "}
            {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {frontMatter.readingTime.text}
            {` • `}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>{children}</Grid>
    </LayoutContainer>
  );
}

// frontMatter:  {
//   title: "You don't have to be an expert, you just have to be confident in your ability to figure things out",
//   publishedAt: '2021-01-26',
//   summary: 'Visualize my journey through the scenic lands of Norway with rich, stunning pictures and daily travel logs.',
//   image: '/static/images/10-days-in-norway/banner.png',
//   wordCount: 87,
//   readingTime: { text: '1 min read', minutes: 0.425, time: 25500, words: 85 },
//   slug: 'you-dont-have-to-be-an-expert'
// }
