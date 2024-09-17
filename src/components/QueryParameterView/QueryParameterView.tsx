'use client';
import { useCallback, useEffect, useId, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createQuery } from '@/utils/functions/createQuery';
import type { FC, ChangeEvent, SyntheticEvent } from 'react';
import type { QueryParameterViewProps, stateArray } from './types';
import styles from './QueryParameterView.module.scss';

const label = { inputProps: { 'aria-label': 'Use the parameter' } };

export const QueryParameterView: FC<QueryParameterViewProps> = ({
  name,
  placeholderText,
  value,
  id,
  index,
  onRemove,
  isChecked,
}) => {
  const parameterId = useId();
  const [queryTitle, setQueryTitle] = useState<string>(name);
  const [queryValue, setQueryValue] = useState<string>(value);
  const [isActive, setIsActive] = useState<boolean>(isChecked);
  const removeHandler = () => {
    changeQueries('delete');
    onRemove((state: stateArray) => state.filter((it) => it.id !== id));
  };

  function changeTitleHandler(e: ChangeEvent) {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setQueryTitle(input.value);
  }

  function changeValueHandler(e: ChangeEvent) {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setQueryValue(input.value);
  }

  function changeCheckboxHandler(e: ChangeEvent) {
    e.stopPropagation();
    setIsActive(!isActive);
  }

  function blurHandler(e: SyntheticEvent) {
    if (!(isActive && queryTitle && queryValue)) {
      e.stopPropagation();
    }
  }

  const changeQueries = useCallback(
    (action?: string) => {
      const query = createQuery(placeholderText, {
        name: queryTitle,
        value: queryValue,
        id: id,
      });

      const data = {
        action: action || 'delete',
        state: query,
      };

      if (!action && isActive && queryTitle && queryValue) {
        data.action = 'add';
      }

      if (query.placeholderText === 'parameter') {
        document.body.dispatchEvent(
          new CustomEvent('qupdate', { detail: data })
        );
      }
    },
    [id, isActive, placeholderText, queryTitle, queryValue]
  );

  useEffect(() => {
    changeQueries();
  }, [changeQueries]);

  return (
    <div className={styles.query_box}>
      <Checkbox
        onChange={changeCheckboxHandler}
        onBlur={blurHandler}
        defaultChecked={isChecked}
        classes={{ root: styles.query_box_activated }}
        {...label}
      />

      <TextField
        id={`${parameterId}-name`}
        label={placeholderText}
        name={`${placeholderText}-title-${index}`}
        value={queryTitle}
        disabled={!isActive}
        variant="standard"
        autoComplete="off"
        onChange={changeTitleHandler}
        onBlur={blurHandler}
        classes={{ root: styles.query_box_input }}
        slotProps={{
          htmlInput: {
            form: 'graphql',
          },
        }}
        fullWidth
      />

      <TextField
        id={`${parameterId}-value`}
        label="value"
        name={`${placeholderText}-value-${index}`}
        value={queryValue}
        disabled={!isActive}
        variant="standard"
        autoComplete="off"
        onChange={changeValueHandler}
        onBlur={blurHandler}
        classes={{ root: styles.query_box_input }}
        slotProps={{
          htmlInput: {
            form: 'graphql',
          },
        }}
        fullWidth
      />

      <Button
        variant="text"
        onClick={removeHandler}
        onBlur={blurHandler}
        classes={{ root: styles.query_box_remove }}
      >
        X
      </Button>
    </div>
  );
};
