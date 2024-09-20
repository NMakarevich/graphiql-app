'use client';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './QueryResponsePanel.module.scss';

export const QueryResponsePanel = () => {
  const [value, setValue] = useState<string>('');

  const changeValueHandler = (e: ChangeEvent) => {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setValue(input.value);
  };

  useEffect(() => {
    const valueChangeHandler = (e: CustomEventInit) => {
      if (e.detail) {
        const { data, error, statusText } = JSON.parse(e.detail);

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
    <textarea
      className={styles.graphiql_editors_result}
      value={value}
      onChange={changeValueHandler}
      readOnly={true}
    />
  );
};
