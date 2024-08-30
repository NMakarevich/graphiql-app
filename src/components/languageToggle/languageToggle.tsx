import { FC, useEffect, useState } from 'react';
import styles from './language-toggle.module.scss';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { ILanguageToggleProps } from './types';

const LanguageToggle: FC<ILanguageToggleProps> = (props): JSX.Element => {
  const { firstLanguage, secondLanguage } = props.languages;
  const [language, setLanguage] = useState<string>(firstLanguage);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect((): void => {
    language === firstLanguage ? setChecked(false) : setChecked(true);
  }, [language, firstLanguage, secondLanguage]);

  useEffect((): void => {
    checked ? setLanguage(secondLanguage) : setLanguage(firstLanguage);
  }, [checked, firstLanguage, secondLanguage]);

  function toggleLanguage(language?: string) {
    if (language) setLanguage(language);
    else {
      setChecked(!checked);
    }
  }

  return (
    <div className={styles.Toggle}>
      <Typography
        className={styles.Language}
        onClick={(): void => toggleLanguage(firstLanguage)}
      >
        {firstLanguage}
      </Typography>
      <Switch onChange={(): void => toggleLanguage()} checked={checked} />
      <Typography
        className={styles.Language}
        onClick={(): void => toggleLanguage(secondLanguage)}
      >
        {secondLanguage}
      </Typography>
    </div>
  );
};

export default LanguageToggle;
