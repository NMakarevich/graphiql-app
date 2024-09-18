/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { UrlInput } from '../UrlInput/UrlInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/utils/constants/routes';
import { getHistoryItem, getGraphQLForHistory } from '@/utils/history/history';
import type { EditorSegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';

const defaultCode = 418;

export const GraphqlForm: FC<EditorSegmentsProp> = ({
  urlSegment,
  codeSegment,
  graphqlFormAction,
}) => {
  const [formState, formAction] = useFormState(graphqlFormAction, '');
  const [code, setCode] = useState<number>(0);
  const [localStorage, setLocalStorage] = useLocalStorage('history', '{}');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (formState) {
      const { statusCode } = JSON.parse(formState);

      setCode(statusCode || defaultCode);
    }

    document.body.dispatchEvent(
      new CustomEvent('submitresponse', { detail: formState })
    );
  }, [formState]);

  useEffect(() => {
    if (urlSegment && formState) {
      const sqParams = searchParams.toString();
      const url = `${ROUTES.GRAPHIQL_PATH}${urlSegment ? '/' + encodeURIComponent(btoa(urlSegment)) : ''}${codeSegment ? '/' + encodeURIComponent(btoa(codeSegment)) : ''}${sqParams ? '?' + sqParams : ''}`;
      const newHistoryValue = getGraphQLForHistory(
        getHistoryItem('GRAPHQL', urlSegment || '', url),
        localStorage
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
      />

      {formState && (
        <span className={styles.graphql_form_code}>
          <span>status:</span>
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