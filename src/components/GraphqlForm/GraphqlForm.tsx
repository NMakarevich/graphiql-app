/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { UrlInput } from '../UrlInput/UrlInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getGraphQLPath } from '@/utils/functions/getGraphQLPath';
import { getHistoryItem, getGraphQLForHistory } from '@/utils/history/history';
import { getIsStringJSON } from '@/utils/functions/getIsStringJSON';
import type { EditorSegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';
import { useTranslation } from 'react-i18next';
import '@/utils/localization/i18n';

const defaultCode = 418;

export const GraphqlForm: FC<EditorSegmentsProp> = ({
  urlSegment,
  codeSegment,
  lang,
  graphqlFormAction,
}) => {
  const [formState, formAction] = useFormState(graphqlFormAction, '');
  const [code, setCode] = useState<number>(0);
  const [localStorageHook, setLocalStorage] = useLocalStorage('history', '{}');
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLocale = localStorage.getItem('LOCALE') || 'en';
    i18n.changeLanguage(savedLocale);
  }, [i18n]);

  useEffect(() => {
    if (formState) {
      const { statusCode, error } = JSON.parse(formState);
      const isJSON = getIsStringJSON(error);

      if (isJSON) {
        const { code: status } = JSON.parse(error);

        if (status) {
          setCode(status);
        }
      } else {
        setCode(statusCode || defaultCode);
      }
    }

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
        lang={lang}
      />

      {formState && (
        <span className={styles.graphql_form_code}>
          <span>{t('graphiqlResponseStatus')}:</span>
          <span
            className={classNames([
              {
                [styles.graphql_form_code_number]: true,
                [styles.graphql_form_code_succes]: code >= 200 && code < 300,
                [styles.graphql_form_code_warning]: code >= 300 && code < 400,
                [styles.graphql_form_code_error]: code >= 400 && code < 600,
              },
            ])}
          >
            {code}
          </span>
        </span>
      )}
    </form>
  );
};
