import { useState } from "react";
import useSWR from "swr";
import format from "comma-number";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import fetcher from "@lib/fetcher";
import Link from "@components/Link";
import SuccessMessage from "@components/SuccessMessage";
import ErrorMessage from "@components/ErrorMessage";
import useFormShield from "@components/useFormShield";
import { ACTIONS } from "@lib/formShield";

export default function Subscribe() {
  const [form, setForm] = useState({
    state: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const { data } = useSWR("/api/subscribers", fetcher);
  const subscriberCount = format(data?.count);
  const { shieldFields, arm, getShieldPayload, resetShield } = useFormShield(
    ACTIONS.subscribe,
  );

  //@ts-ignore
  const subscribe = async (e) => {
    e.preventDefault();
    setForm({
      state: "loading",
      message: "",
    });

    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({
          email: message,
          ...(await getShieldPayload()),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json().catch(() => ({
        error: res.ok ? "" : "Something went wrong. Please try again.",
      }));

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
    } catch (error) {
      setForm({
        state: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      resetShield();
    }
  };
  return (
    <>
      <Grid
        sx={(theme) => ({
          border: `2px solid ${theme.palette.grey[400]}`,
          borderRadius: 5,
          padding: "1.1rem",
          marginTop: "1rem",
          marginBottom: "1rem",
        })}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
          }}
        >
          Subscribe to the newsletter
        </Typography>
        <Typography variant="body1" paragraph>
          Get emails from me about web development, techie stuff, and latest
          articles.
        </Typography>

        <form onSubmit={subscribe}>
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
            onFocus={arm}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  disabled={form.state === "loading"}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {form.state === "loading" ? (
                    <CircularProgress />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              ),
            }}
          />
          {shieldFields}
        </form>
        {form.state === "error" ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === "success" ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              color: "grey",
              marginTop: "1rem",
            }}
          >
            {`${subscriberCount || "-"} subscribers – `}
            <Link href="/newsletter">4 issues</Link>
          </Typography>
        )}
      </Grid>
    </>
  );
}
