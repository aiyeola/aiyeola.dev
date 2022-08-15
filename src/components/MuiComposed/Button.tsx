import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function ButtonComposed({ children, ...props }) {
  return (
    <Button
      component={LoadingButton}
      loadingIndicator={
        <CircularProgress color="inherit" size={20} thickness={5} />
      }
      {...props}
    >
      {children}
    </Button>
  );
}
