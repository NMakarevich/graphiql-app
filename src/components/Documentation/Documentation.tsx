'use client';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useContext, useEffect, useState } from 'react';
import styles from './Documentation.module.scss';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';
import { DocumentationContext } from '@/providers/documentationProvider/documentation.tsx';
import { GraphQLDoc } from '@/types/interfaces.ts';

export const Documentation = () => {
  const [state, setState] = useState<boolean>(false);
  const { documentation } = useContext(DocumentationContext);
  const [doc, setDoc] = useState<GraphQLDoc>({});

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  useEffect(() => {
    const types = documentation?.types?.filter(
      (type) => !type.name.startsWith('__')
    );
    setDoc({ ...documentation, types });
  }, [documentation]);

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
      <Button onClick={toggleDrawer(true)} title={t('graphqlDocButton')}>
        <HelpOutlineIcon />
      </Button>

      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        classes={{ paperAnchorLeft: styles.doc_container }}
      >
        <div className={styles.doc_content}>
          {JSON.stringify(doc?.types?.slice(0, 1), null, 2)}
        </div>
      </Drawer>
    </>
  );
};
