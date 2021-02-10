import { parseISO, format } from "date-fns";

import Link from "@components/Link";

//@ts-ignore
export default function NewsletterLink({ slug, publishedAt }) {
  return (
    <li
      style={{
        marginBottom: "1rem",
      }}
    >
      <Link
        href={`/newsletter/${slug}`}
        underline="always"
        color="primary"
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        {format(parseISO(publishedAt), "MMMM dd, yyyy")}
      </Link>
    </li>
  );
}
