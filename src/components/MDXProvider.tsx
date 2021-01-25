import { MDXProvider } from '@mdx-js/react';
import Typography from '@material-ui/core/Typography';

export default function MDXCompProvider(props: any) {
  const state = {
    h1: (props: any) => <Typography variant="h1" {...props} />,
  };

  return (
    <MDXProvider components={state}>
      <main {...props} />
    </MDXProvider>
  );
}
