'use client';
import { FC, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import TextField from '@mui/material/TextField';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ChangeEvent } from 'react';
import { UrlInputProps } from './types';

export const DocUrlInput: FC<UrlInputProps> = ({ classes, urlSegment }) => {
  const [value, setValue] = useState<string>(
    urlSegment ? `${urlSegment}?sdl` : ''
  );
  const [fullUrl] = useDebounce<string>(value, 650);
  const [, setLocalStorageValue] = useLocalStorage('docUrl', '');

  function changeValueHandler(e: ChangeEvent) {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setValue(input.value);
  }

  useEffect(() => {
    setLocalStorageValue(fullUrl);
  });

  return (
    <TextField
      id="docUrl"
      label="documentation url"
      variant="outlined"
      name="docUrl"
      value={value}
      autoComplete="off"
      onChange={changeValueHandler}
      classes={{ root: classes }}
      fullWidth
    />
  );
};
