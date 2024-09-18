'use client';
import { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import classNames from 'classnames';
import { UrlInput } from '../UrlInput/UrlInput';
import type { EditorSegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';

const defaultCode = 418;

export const GraphqlForm: FC<EditorSegmentsProp> = ({
  urlSegment,
  codeSegment,
  graphqlFormAction,
}) => {
  const [formState, formAction] = useFormState(graphqlFormAction, '');
  const [code, setCode] = useState<number>(defaultCode);

  useEffect(() => {
    if (formState) {
      const { statusCode } = JSON.parse(formState);

      setCode(statusCode || defaultCode);
    }

    document.body.dispatchEvent(
      new CustomEvent('submitresponse', { detail: formState })
    );
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

      <span
        className={classNames([
          {
            [styles.graphql_form_code]: true,
            [styles.graphql_form_code_succes]: code >= 200 && code < 300,
            [styles.graphql_form_code_warning]: code >= 300 && code < 400,
            [styles.graphql_form_code_error]: code >= 400 && code < 600,
          },
        ])}
      >
        {code}
      </span>
    </form>
  );
};
