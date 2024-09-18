'use client';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import styles from './Documentation.module.scss';

export const Documentation = () => {
  const [state, setState] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  return (
    <>
      <Button onClick={toggleDrawer(true)} title="Open the documentation">
        <HelpOutlineIcon />
      </Button>

      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        classes={{ paperAnchorLeft: styles.doc_container }}
      >
        <div className={styles.doc_content}></div>
      </Drawer>
    </>
  );
};
