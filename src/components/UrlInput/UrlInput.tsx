'use client';
import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { getGraphQLPath } from '@/utils/functions/getGraphQLPath';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { UrlInputProps } from './types';

export const UrlInput: FC<UrlInputProps> = ({
  classes,
  urlSegment,
  codeSegment,
  lang,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(urlSegment || '');

  const blurHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    const sqParams = searchParams.toString();
    const url = getGraphQLPath(lang || '', value, codeSegment, sqParams);

    router.replace(url, { scroll: false });
  };

  function changeValueHandler(e: ChangeEvent) {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setValue(input.value);
  }

  return (
    <TextField
      id="url"
      label="url"
      variant="outlined"
      name="url"
      value={value}
      autoComplete="off"
      onBlur={blurHandler}
      onChange={changeValueHandler}
      classes={{ root: classes }}
      fullWidth
    />
  );
};
