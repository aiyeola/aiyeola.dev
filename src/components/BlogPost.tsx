import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useSWR from "swr";
import format from "comma-number";

import Text from "@components/MuiComposed/Text";
import Link from "@components/MuiComposed/Link";
import Flex from "@components/MuiComposed/Flex";
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
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  const { slug, title } = props;

  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Flex
      flexDirection={matchesXS ? "column" : "row"}
      justifyContent={matchesXS ? undefined : "space-between"}
      width="100%"
      mb="2rem"
    >
      <Flex
        sx={{
          maxWidth: matchesXS ? "100%" : "75%",
        }}
      >
        <Link href={`/blog/${slug}`}>
          <Text
            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </Link>
      </Flex>
      <Flex>
        <Text variant="subtitle1">
          {`${views ? format(views) : "––"} views`}
        </Text>
      </Flex>
    </Flex>
  );
}
