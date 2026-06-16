/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { UrlInput } from '../UrlInput/UrlInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getGraphQLPath } from '@/utils/functions/getGraphQLPath';
import { getHistoryItem, getGraphQLForHistory } from '@/utils/history/history';
import type { EditorSegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

export const GraphqlForm: FC<EditorSegmentsProp> = ({
  urlSegment,
  codeSegment,
  lang,
  graphqlFormAction,
}) => {
  const [formState, formAction] = useFormState(graphqlFormAction, '');
  const [localStorageHook, setLocalStorage] = useLocalStorage('history', '{}');
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  useEffect(() => {
    document.body.dispatchEvent(
      new CustomEvent('submitresponse', { detail: formState })
    );
  }, [formState]);

  useEffect(() => {
    if (urlSegment && formState) {
      const sqParams = searchParams.toString();
      const url = getGraphQLPath('', urlSegment, codeSegment || '', sqParams);
      const newHistoryValue = getGraphQLForHistory(
        getHistoryItem('GRAPHQL', urlSegment, url),
        localStorageHook
      );

      setLocalStorage(newHistoryValue);
    }
  }, [formState]);

  function setUrlSchema() {
    return urlSegment ? `${urlSegment}?sdl` : '';
  }

  return (
    <form
      action={formAction}
      id="graphql"
      name="graphql"
      className={styles.graphql_form}
    >
      <UrlInput
        classes={styles.graphql_form_url}
        urlSegment={urlSegment}
        codeSegment={codeSegment}
        label="url"
        lang={lang}
      />

      <UrlInput
        classes={styles.graphql_form_url}
        label="url schema"
        urlSegment={setUrlSchema()}
        lang={lang}
      />
    </form>
  );
};
