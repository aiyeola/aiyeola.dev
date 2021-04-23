import Typography from "@material-ui/core/Typography";

//@ts-ignore
export default function Paragraph(props) {
  return (
    <Typography
      variant="body1"
      style={{
        marginTop: "2rem",
        fontSize: "1.2rem",
        lineHeight: "1.55",
      }}
      {...props}
    />
  );
}
