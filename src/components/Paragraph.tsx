import Typography from "@mui/material/Typography";

//@ts-ignore
export default function Paragraph(props) {
  return (
    <Typography
      variant="body1"
      sx={{
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "1.2rem",
        lineHeight: "1.55",
      }}
      {...props}
    />
  );
}
