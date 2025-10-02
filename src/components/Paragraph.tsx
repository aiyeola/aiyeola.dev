import Typography from "@mui/material/Typography";

//@ts-ignore
export default function Paragraph(props) {
  return (
    <Typography
      variant="body2"
      component="div"
      sx={{
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "1.2rem",
        lineHeight: "1.6",
      }}
      {...props}
    />
  );
}
