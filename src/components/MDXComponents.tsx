import Image from "next/image";

import Link from "@components/Link";
import Paragraph from "@components/Paragraph";

//@ts-ignore
const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        underline="always"
        color="primary"
        style={{
          fontWeight: "bold",
        }}
        href={href}
        {...props}
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontWeight: "bold",
      }}
      {...props}
    />
  );
};

const MDXComponents = {
  img: Image,
  a: CustomLink,
  p: (props: any) => <Paragraph {...props} />,
};

export default MDXComponents;
