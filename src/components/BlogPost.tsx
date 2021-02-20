import { parseISO, format as formatDate } from "date-fns";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useSWR from "swr";
import format from "comma-number";

import Link from "@components/Link";
import fetcher from "@lib/fetcher";

type Posts = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
};

export default function BlogPost(props: Posts) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const { slug, title, publishedAt } = props;

  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Grid
      item
      container
      direction={matchesXS ? "column" : "row"}
      justify={matchesXS ? undefined : "space-between"}
      style={{
        marginBottom: "2rem",
      }}
    >
      <Grid
        item
        style={{
          maxWidth: matchesXS ? "100%" : "75%",
        }}
      >
        <Link href={`/blog/[slug]`} as={`/blog/${slug}`}>
          <Typography
            style={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          {formatDate(parseISO(publishedAt), "MMMM dd, yyyy")}{" "}
          {`${views ? format(views) : "––"} views`}
        </Typography>
      </Grid>
    </Grid>
  );
}
