import { useState } from "react";
import { format } from "date-fns";
import useSWR, { mutate } from "swr";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

import fetcher from "@lib/fetcher";
import Flex from "@components/MuiComposed/Flex";
import Text from "@components/MuiComposed/Text";
import Link from "@components/MuiComposed/Link";
import SuccessMessage from "@components/SuccessMessage";
import ErrorMessage from "@components/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: "rgb(220,39,38)",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

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
  const theme = useTheme();

  const [form, setForm] = useState({
    state: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const { data: user } = useSWR("/api/user", fetcher);
  const { data: entries } = useSWR("/api/guestbook", fetcher, {
    initialData: initialEntries,
  });

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
      <Flex
        flexDirection="column"
        p="1.1rem"
        my="1rem"
        sx={{
          border: `1px solid ${theme.palette.grey[400]}`,
          borderRadius: "20px",
        }}
      >
        <Text
          variant="h6"
          gutterBottom
          style={{
            fontWeight: "bold",
          }}
        >
          Sign the Guestbook
        </Text>
        <Text variant="body1" paragraph>
          Share a message for a future visitor of my site.
        </Text>
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
                  style={{
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
            style={{
              fontWeight: "bold",
              alignSelf: "flex-start",
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
          <Text variant="subtitle2" color="grey" mt="1rem">
            Your information is only used to display your name and reply by
            email.
          </Text>
        )}
      </Flex>

      <Flex flexDirection="column" mt="2rem">
        {entries?.map((entry: { id: string | number | null | undefined }) => (
          <GuestbookEntry key={entry.id} entry={entry} user={user} />
        ))}
      </Flex>
    </>
  );
}

function GuestbookEntry({ entry, user }) {
  const classes = useStyles();

  const deleteEntry = async (e) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/guestbook");
  };

  return (
    <>
      <Flex mb=".5rem">
        <Text variant="h6">{entry.body}</Text>
      </Flex>
      <Flex mb="1rem">
        <Text component="span" variant="subtitle2" color="#858a93">
          {entry.created_by}
        </Text>
        <Text component="span" variant="subtitle2" color="rgb(156,163,175)">
          {" "}
          / {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}{" "}
        </Text>
        {user && entry.created_by === user.name && (
          <>
            /
            <Button
              variant="text"
              disableRipple
              className={classes.deleteButton}
              onClick={deleteEntry}
            >
              Delete
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
