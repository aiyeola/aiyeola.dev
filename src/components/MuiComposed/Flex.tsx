import Box from '@mui/material/Box';

export default function Flex({ children, ...props }) {
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  );
}
