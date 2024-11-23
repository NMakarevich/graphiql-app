'use client';
import { FC, useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { getGraphQLPath } from '@/utils/functions/getGraphQLPath';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { UrlInputProps } from './types';
import getSchema from '@/utils/graphQL/getSchema/getSchema.ts';
import { DocumentationContext } from '@/providers/documentationProvider/documentation.tsx';

export const UrlInput: FC<UrlInputProps> = ({
  classes,
  urlSegment,
  codeSegment,
  label,
  lang,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(urlSegment || '');
  const { setDocumentation } = useContext(DocumentationContext);

  const blurHandler = async (e: SyntheticEvent) => {
    e.stopPropagation();

    const sqParams = searchParams.toString();
    const url = getGraphQLPath(lang || '', value, codeSegment, sqParams);

    if (label === 'url') router.replace(url, { scroll: false });

    if (value) {
      const schemaUrl = label === 'url' ? `${value}?sdl` : value;
      const data = await getSchema(schemaUrl);
      const schema = data.data.__schema;
      console.log(schema);
      setDocumentation(schema);
    }
  };

  function changeValueHandler(e: ChangeEvent) {
    e.stopPropagation();
    const input = e.currentTarget as HTMLInputElement;
    setValue(input.value);
  }

  return (
    <TextField
      id="url"
      label={label}
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
