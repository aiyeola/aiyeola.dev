import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
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

  const { slug, title } = props;

  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Grid
      item
      container
      direction={matchesXS ? "column" : "row"}
      justifyContent={matchesXS ? undefined : "space-between"}
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
        <Link href={`/blog/${slug}`}>
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
          {`${views ? format(views) : "––"} views`}
        </Typography>
      </Grid>
    </Grid>
  );
}
