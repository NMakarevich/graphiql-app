'use client';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './QueryResponsePanel.module.scss';
import ResponseStatus from '@components/responseStatus/responseStatus.tsx';

export const QueryResponsePanel = () => {
  const [value, setValue] = useState<string>('');
  const [code, setCode] = useState<number>(0);

  const changeValueHandler = (e: ChangeEvent) => {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setValue(input.value);
  };

  useEffect(() => {
    const valueChangeHandler = (e: CustomEventInit) => {
      if (e.detail) {
        const { data, error, statusText, statusCode } = JSON.parse(e.detail);
        if (error) {
          const { code } = JSON.parse(error);
          setCode(code);
        } else setCode(statusCode);

        if (data) {
          setValue(JSON.stringify(data, null, 2));
        } else if (error) {
          setValue(
            JSON.stringify(
              {
                error,
                info: statusText,
              },
              null,
              2
            )
          );
        }
      }
    };

    document.body.addEventListener('submitresponse', valueChangeHandler);

    return () => {
      document.body.removeEventListener('submitresponse', valueChangeHandler);
    };
  }, [value]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.statusCode}>
        <ResponseStatus status={code} />
      </div>
      <textarea
        className={styles.graphiql_editors_result}
        value={value}
        onChange={changeValueHandler}
        readOnly={true}
      />
    </div>
  );
};
