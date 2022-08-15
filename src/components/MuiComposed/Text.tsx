import Typography from "@mui/material/Typography";

export default function Text({ children, ...props }) {
  return <Typography {...props}>{children}</Typography>;
}
