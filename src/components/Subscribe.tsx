import { useState } from "react";
import useSWR from "swr";
import format from "comma-number";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import fetcher from "@lib/fetcher";
import Link from "@components/Link";
import SuccessMessage from "@components/SuccessMessage";
import ErrorMessage from "@components/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  guestBox: {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 20,
    padding: "1.1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

export default function Subscribe() {
  const classes = useStyles();

  const [form, setForm] = useState({
    state: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const { data } = useSWR("/api/subscribers", fetcher);
  const subscriberCount = format(data?.count);

  //@ts-ignore
  const subscribe = async (e) => {
    e.preventDefault();
    setForm({
      state: "loading",
      message: "",
    });

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: "error",
        message: error,
      });
      return;
    }

    setMessage("");
    setForm({
      state: "success",
      message: `Hooray! You're now on the list.`,
    });
  };
  return (
    <>
      <Grid item className={classes.guestBox}>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontWeight: "bold",
          }}
        >
          Subscribe to the newsletter
        </Typography>
        <Typography variant="h6" paragraph>
          Get emails from me about web development, techie stuff, and latest
          articles.
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="email"
          name="subscribe-email"
          autoComplete="email"
          value={message}
          variant="outlined"
          placeholder="adam@flutter.com"
          required
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                onClick={subscribe}
                style={{
                  fontWeight: "bold",
                }}
              >
                {form.state === "loading" ? <CircularProgress /> : "Subscribe"}
              </Button>
            ),
          }}
        />
        {form.state === "error" ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === "success" ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <Typography
            variant="subtitle2"
            style={{
              color: "grey",
              marginTop: "1rem",
            }}
          >
            {`${subscriberCount || "-"} subscribers – `}
            <Link href="/newsletter">2 issues</Link>
          </Typography>
        )}
      </Grid>
    </>
  );
}
