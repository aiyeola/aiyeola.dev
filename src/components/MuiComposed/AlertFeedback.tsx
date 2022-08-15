import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

enum Status {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

type AlertFeedbackProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  status: string;
};

export default function AlertFeedback({
  open,
  onClose,
  message,
  status,
}: AlertFeedbackProps) {
  const level = Status[status];

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      autoHideDuration={4500}
      TransitionComponent={SlideTransition}
      key={message}
    >
      <Alert onClose={onClose} severity={level} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
