import Grid from "@mui/material/Grid2";
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
      container
      direction={matchesXS ? "column" : "row"}
      justifyContent={matchesXS ? undefined : "space-between"}
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Grid
        sx={{
          maxWidth: matchesXS ? "100%" : "75%",
          width: "100%",
        }}
      >
        <Link href={`/blog/${slug}`}>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Link>
      </Grid>
      <Grid>
        <Typography variant="subtitle1">
          {`${views ? format(views) : "--"} views`}
        </Typography>
      </Grid>
    </Grid>
  );
}
