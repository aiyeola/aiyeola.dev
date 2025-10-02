import { useState } from "react";
import { format } from "date-fns";
import useSWR, { mutate } from "swr";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import fetcher from "@lib/fetcher";
import Link from "@components/Link";
import SuccessMessage from "@components/SuccessMessage";
import ErrorMessage from "@components/ErrorMessage";

//@ts-ignore
function GuestbookEntry({ entry, user }) {
  //@ts-ignore
  const deleteEntry = async (e) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/guestbook");
  };

  return (
    <>
      <Grid
        sx={{
          marginBottom: ".5rem",
        }}
      >
        <Typography variant="h6">{entry.body}</Typography>
      </Grid>
      <Grid
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Typography
          component={"span"}
          variant="subtitle2"
          sx={{
            color: "#858a93",
          }}
        >
          {entry.created_by}
        </Typography>
        <Typography
          component={"span"}
          variant="subtitle2"
          sx={{
            color: "rgb(156,163,175)",
          }}
        >
          {" "}
          / {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}{" "}
        </Typography>
        {user && entry.created_by === user.name && (
          <>
            /
            <Button
              variant="text"
              disableRipple
              sx={{
                color: "rgb(220,39,38)",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={deleteEntry}
            >
              Delete
            </Button>
          </>
        )}
      </Grid>
    </>
  );
}

interface Entries {
  id: number;
  email: string;
  updated_at: Date;
  body: string;
  created_by: string;
}

export default function Guestbook({
  initialEntries,
}: {
  initialEntries: Entries[];
}) {
  const [form, setForm] = useState({
    state: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const { data: user } = useSWR("/api/user", fetcher);
  const { data: entries } = useSWR("/api/guestbook", fetcher, {
    fallbackData: initialEntries,
  });

  //@ts-ignore
  const leaveEntry = async (e) => {
    e.preventDefault();

    if (message === "") {
      setForm({
        state: "error",
        message: "Kindly, fill in something",
      });
    } else {
      setForm({
        state: "loading",
        message: "",
      });

      const res = await fetch("/api/guestbook", {
        body: JSON.stringify({
          body: message,
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
      mutate("/api/guestbook");
      setForm({
        state: "success",
        message: `Hooray! Thanks for signing my Guestbook.`,
      });
    }
  };

  return (
    <>
      <Grid
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[400]}`,
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
          Sign the Guestbook
        </Typography>
        <Typography variant="body1" paragraph>
          Share a message for a future visitor of my site.
        </Typography>
        {user?.name ? (
          <TextField
            fullWidth
            size="small"
            name="sign-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            placeholder="Your Message..."
            InputProps={{
              endAdornment: (
                <Button
                  onClick={leaveEntry}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {form.state === "loading" ? <CircularProgress /> : "Sign"}
                </Button>
              ),
            }}
          />
        ) : (
          <Button
            component={Link}
            href="/api/auth"
            sx={{
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        )}
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
            Your information is only used to display your name and reply by
            email.
          </Typography>
        )}
      </Grid>

      <Grid
        container
        direction="column"
        sx={{
          marginTop: "2rem",
        }}
      >
        {entries?.map((entry: { id: string | number | null | undefined }) => (
          <GuestbookEntry key={entry.id} entry={entry} user={user} />
        ))}
      </Grid>
    </>
  );
}
