import Button from '@material-ui/core/Button';

export default function MyButton({ text }: { text: string }) {
  return <Button variant="contained">{text}</Button>;
}
