import { Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export const Submit = () => {
  return (
    <Button type="submit" form="graphql" title="Send a request">
      <PlayCircleIcon />
    </Button>
  );
};
