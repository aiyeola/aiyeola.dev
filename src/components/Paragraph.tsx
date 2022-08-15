import Text from "@components/MuiComposed/Text";

export default function Paragraph(props) {
  return (
    <Text
      variant="body1"
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "1.2rem",
        lineHeight: "1.55",
      }}
      {...props}
    />
  );
}
