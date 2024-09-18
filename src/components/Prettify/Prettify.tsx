'use client';
import { Button } from '@mui/material';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

export const Prettify = () => {
  const formatCodeHandler = () => {
    document.body.dispatchEvent(new CustomEvent('format', { bubbles: true }));
  };

  return (
    <Button onClick={formatCodeHandler} title="Format code">
      <LightbulbCircleIcon />
    </Button>
  );
};
