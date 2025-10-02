import Image from "next/image";

import Link from "@components/Link";
import Paragraph from "@components/Paragraph";
import ULists from "@components/ULists";
import OLists from "@components/OLists";
import Code from "@components/Code";

const ResponsiveImage = (props: any) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <Image
        {...props}
        style={{
          maxWidth: "100%",
          height: "auto",
          ...props.style,
        }}
      />
    </div>
  );
};

const CustomLink = (props: any) => {
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
  Image: ResponsiveImage,
  a: CustomLink,
  p: (props: any) => <Paragraph {...props} />,
  ul: (props: any) => <ULists {...props} />,
  ol: (props: any) => <OLists {...props} />,
  code: Code,
  h1: (props: any) => (
    <h1
      style={{ fontSize: "2rem", marginTop: "2rem", marginBottom: "1rem" }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      style={{
        fontSize: "1.5rem",
        marginTop: "1.5rem",
        marginBottom: "0.75rem",
      }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      style={{
        fontSize: "1.25rem",
        marginTop: "1.25rem",
        marginBottom: "0.5rem",
      }}
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      style={{ fontSize: "1.1rem", marginTop: "1rem", marginBottom: "0.5rem" }}
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      style={{ fontSize: "1rem", marginTop: "1rem", marginBottom: "0.5rem" }}
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      style={{ fontSize: "0.9rem", marginTop: "1rem", marginBottom: "0.5rem" }}
      {...props}
    />
  ),
};

export default MDXComponents;
