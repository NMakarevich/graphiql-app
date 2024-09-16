'use client';

import { Divider, Paper } from '@mui/material';
import styles from './restfulLayout.module.scss';
import { useForm } from 'react-hook-form';
import RESTful from '@components/restfulLayout/types.ts';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateURL, parseURL, prettify } from '@/utils/restful/restful.ts';
import { useState } from 'react';
import request from '@/utils/request/request.ts';
import { useLocalStorage } from '@hooks/useLocalStorage.ts';
import { saveToHistory } from '@/utils/history/history.ts';
import RestfulHeader from '@components/restfulHeader/restfulHeader.tsx';
import RestfulRequestHeaders from '@components/restfulRequestHeaders/restfulRequestHeaders.tsx';
import RestfulVariables from '@components/restfulVariables/restfulVariables.tsx';
import RestfulReqRes from '@components/restfulReqRes/restfulReqRes.tsx';

function RestfulLayout(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [responseStatus, setResponseStatus] = useState(0);
  const [response, setResponse] = useState('');
  const [localStorage, setLocalStorage] = useLocalStorage('history', '{}');

  const { control, handleSubmit, getValues, setValue } = useForm<RESTful>({
    defaultValues: { ...parseURL(pathname, searchParams) },
    mode: 'onSubmit',
  });

  async function onSubmit(data: RESTful) {
    setResponseStatus(0);
    try {
      setLocalStorage(saveToHistory(data, localStorage));
      const response = await request(data);
      const status = response.status;
      const json = await response.json();
      setResponseStatus(status);
      setResponse(JSON.stringify(json, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setResponseStatus(500);
        setResponse(JSON.stringify({ error: error.message }, null, 2));
      }
    }
  }

  function onBlur() {
    const data = getValues();
    const lang = pathname.split('/')[1];
    const url = `/${lang}${generateURL(data)}`;
    window.history.replaceState(null, '', url);
  }

  function onPrettify() {
    const body = getValues('body');
    const formattedBody = prettify(body);
    setValue('body', formattedBody);
    onBlur();
  }

  return (
    <Paper sx={{ width: '100%', padding: '10px' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onBlur={onBlur}
        className={`${styles.Form} ${styles.Flex} ${styles.FlexColumn}`}
      >
        <header className={`${styles.Header} ${styles.Flex}`}>
          <RestfulHeader control={control} />
        </header>
        <main className={`${styles.Main} ${styles.Flex} ${styles.FlexColumn}`}>
          <section
            className={`${styles.Section} ${styles.Flex} ${styles.FlexColumn}`}
          >
            <RestfulRequestHeaders control={control} />
          </section>
          <section
            className={`${styles.Section} ${styles.Flex} ${styles.FlexColumn}`}
          >
            <RestfulVariables control={control} />
          </section>
          <Divider />
          <RestfulReqRes
            control={control}
            responseStatus={responseStatus}
            response={response}
            onPrettify={onPrettify}
          />
        </main>
      </form>
    </Paper>
  );
}

export default RestfulLayout;
