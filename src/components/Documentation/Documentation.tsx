'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import getSchema from '@/utils/graphQL/getSchema/getSchema';
import type { MouseEvent, KeyboardEvent } from 'react';
import type { DocaLine, DocumentationBodyResponse } from './types';
import styles from './Documentation.module.scss';
import '@/utils/localization/i18n';

export const Documentation = () => {
  const [state, setState] = useState<boolean>(false);
  const [currentDoca, setCurrentDoca] = useState<DocaLine[][]>([]);
  const [level, setLevel] = useState<number>(1);
  const [localStorageValue] = useLocalStorage('docUrl', '');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  const labelReplace = (m: string) => {
    const [label, url] = m.split('](');
    return `<a href="${url.slice(0, url.length - 1)}" target="_blank" title="Go to url">${label.slice(1)}</a>`;
  };

  const codeReplace = (m: string) => `<code>${m.slice(1, m.length - 1)}</code>`;

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (open) {
        if (localStorageValue) {
          getSchema(localStorageValue)
            .then(
              ({ data, statusCode, statusText }: DocumentationBodyResponse) => {
                if (statusCode === 200) {
                  setCurrentDoca([data.__schema.types]);

                  if (
                    event.type === 'keydown' &&
                    ((event as KeyboardEvent).key === 'Tab' ||
                      (event as KeyboardEvent).key === 'Shift')
                  ) {
                    return;
                  }

                  setState(open);
                } else {
                  throw new Error(statusText);
                }
              }
            )
            .catch((err) => {
              console.error(
                `Error! Text: ${(err as Error).message}. Cause: ${(err as Error).cause}`
              );
            });
        } else {
          setState(open);
        }
      } else {
        setState(open);
        setCurrentDoca([]);
        setLevel(1);
      }
    };

  const selectLevel = (level: number, doca?: DocaLine[] | null) => {
    if (!doca) {
      return;
    }

    setLevel(level);
    setCurrentDoca((d) => {
      d[level] = doca;
      return d;
    });
  };

  const backtLevel = () => {
    setLevel(level - 1);
    setCurrentDoca((d) => {
      d[level] = [];
      return d;
    });
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
        <div className={styles.doc_header}>
          {level > 1 && (
            <button className={styles.doc_back_button} onClick={backtLevel}>
              <ReplyIcon />
              {t('graphqlCloseDocButtonTitle')}
            </button>
          )}

          {level === 1 && (
            <span className={styles.doc_back_button}>
              {t('graphqlDocTitle')}
            </span>
          )}

          <button
            className={styles.doc_close_button}
            onClick={toggleDrawer(false)}
            aria-label={t('graphqlCloseDocButton')}
            title={t('graphqlCloseDocButton')}
          >
            <HighlightOffIcon />
          </button>
        </div>

        <div
          className={styles.doc_content}
          style={{
            transform: `translateX(calc(-100% * ${level - 1} - 15px * ${level - 1}))`,
          }}
        >
          {localStorageValue &&
            currentDoca.map((it, idx) => (
              <div key={idx} className={styles.doc_level}>
                {it.map((m, i) => (
                  <div key={`${m.name}-${i}`} className={styles.doc_line}>
                    {(m.description ||
                      (m.description === '' &&
                        !m.fields &&
                        !m.inputFields)) && (
                      <button
                        className={styles.doc_button}
                        onClick={() => {
                          selectLevel(level + 1, [
                            {
                              name: 'text',
                              text:
                                m.description ||
                                `<span class="${styles.doc_text_type}">type:</span>&nbsp;<em>${m.type?.name ? m.type.name : m.type?.kind ? m.type.kind : m?.kind ? m.kind : 'unknown'}</em>` ||
                                '',
                            },
                          ]);
                        }}
                      >
                        {m.name}
                      </button>
                    )}

                    {!m.description && m.fields && (
                      <button
                        className={styles.doc_button}
                        onClick={() => {
                          selectLevel(level + 1, m.fields);
                        }}
                      >
                        {m.name}
                      </button>
                    )}

                    {!m.description && m.inputFields && (
                      <button
                        className={styles.doc_button}
                        onClick={() => {
                          selectLevel(level + 1, m.inputFields);
                        }}
                      >
                        {m.name}
                      </button>
                    )}

                    {m.text && (
                      <p
                        className={styles.doc_text}
                        dangerouslySetInnerHTML={{
                          __html: m.text
                            .replaceAll(/(`).+?\1/gi, codeReplace)
                            .replaceAll(
                              /\[[\w\s]+\]\(http.+\)/gi,
                              labelReplace
                            ),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}

          {!localStorageValue && (
            <p className={styles.doc_no_url}>{t('noUrlMessage')}</p>
          )}
        </div>
      </Drawer>
    </>
  );
};
