import { FC, useEffect, useState } from 'react';
import styles from './language-toggle.module.scss';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

interface Props {
  languages: {
    firstLanguage: string;
    secondLanguage: string;
  };
}

const LanguageToggle: FC<Props> = (props) => {
  const { firstLanguage, secondLanguage } = props.languages;
  const [language, setLanguage] = useState(firstLanguage);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    language === firstLanguage ? setChecked(false) : setChecked(true);
  }, [language, firstLanguage, secondLanguage]);

  useEffect(() => {
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
        onClick={() => toggleLanguage(firstLanguage)}
      >
        {firstLanguage}
      </Typography>
      <Switch onChange={() => toggleLanguage()} checked={checked} />
      <Typography
        className={styles.Language}
        onClick={() => toggleLanguage(secondLanguage)}
      >
        {secondLanguage}
      </Typography>
    </div>
  );
};

export default LanguageToggle;
