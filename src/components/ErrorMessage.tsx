import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        marginTop: "1rem",
      }}
    >
      <Grid>
        <Typography
          variant="subtitle2"
          sx={{
            color: "rgb(220,39,38)",
            fontWeight: "bold",
            verticalAlign: "middle",
            display: "inline-flex",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{
              marginRight: "0.5rem",
              height: "1.2rem",
              width: "1rem",
            }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
}
