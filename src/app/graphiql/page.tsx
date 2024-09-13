'use client';

import Loader from '@/components/loader/loader';
import { endpoint, headers, query } from '@/utils/constants/graphiQLParams';
import getData from '@/utils/graphQL/getData/getData';
import getSchema from '@/utils/graphQL/getSchema/getSchema';
import { useEffect, useState } from 'react';

function GraphiQL(): JSX.Element {
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);

  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        const responseSchema = await getSchema(endpoint);
        console.log(responseSchema);
      } catch (error) {
        const errorMessage = String((error as Error).message);
        console.error('getSchema Error:', error, errorMessage);
      }
    })();
  }, []);

  const handleGetDataResult = async (): Promise<void> => {
    try {
      setLoadingResponse(true);
      const responseData = await getData(endpoint, headers, query);

      console.log('responseData:', responseData);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const errorMessage = `Invalid JSON format. Please check your variables input. ${error.message}`;
        console.error('Syntax Error:', error, errorMessage);
      } else {
        const errorMessage = String(error as Error);
        console.error('getData Error:', error, errorMessage);
      }
    } finally {
      setLoadingResponse(false);
    }
  };

  return (
    <div>
      <div>GraphiQL</div>
      <button onClick={handleGetDataResult}>getData</button>
      <div
        style={{ border: '2px white solid', width: '100px', height: '100px' }}
      >
        {loadingResponse ? <Loader /> : null}
      </div>
    </div>
  );
}

export default GraphiQL;
