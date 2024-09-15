'use client';
import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CodeEditor } from '@/components/CodeEditor/CodeEditor';
import { prettierGraphqlFormater } from '@/utils/functions/prettierGraphqlFormater';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { debounce } from '@/utils/functions/debounce';
import { ROUTES } from '@/utils/constants/routes';
import type { SyntheticEvent } from 'react';
import type { SegmentsProp } from '@/types/interfaces';

const defaultCode = `query  {
allPeople {
edges {
node {
   id
}
}
} 
}`;

export const GraphqlEditor: FC<SegmentsProp> = ({
  urlSegment,
  codeSegment,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCode = codeSegment ? codeSegment : defaultCode;
  const [editorValue, setEditorValue] = useState<string>(
    queryCode || defaultCode
  );
  const [, setLocalStorageValue] = useLocalStorage(
    'graphqlActiveRequest',
    editorValue
  );
  const saveContent = debounce(setLocalStorageValue);

  const codeChangeHandler = (value: string) => {
    setEditorValue(value);
  };

  const editorBlurHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    const sqParams = searchParams.toString();
    const url = `${ROUTES.GRAPHIQL_PATH}/${urlSegment ? encodeURIComponent(btoa(urlSegment)) : ''}/${editorValue ? encodeURIComponent(btoa(editorValue)) : ''}${sqParams ? '?' + sqParams : ''}`;

    router.push(url, { scroll: false });
  };

  useEffect(() => {
    saveContent(editorValue);
    document.body.dispatchEvent(
      new CustomEvent('delivery', { detail: editorValue })
    );
  });

  useEffect(() => {
    const formatCodeHandler = (e: Event) => {
      e.stopPropagation();

      prettierGraphqlFormater(editorValue)
        .then((data) => {
          setEditorValue(data);
        })
        .catch((err: Error) => {
          throw new Error(err.message);
        });
    };

    document.body.addEventListener('format', formatCodeHandler);

    return () => {
      document.body.removeEventListener('format', formatCodeHandler);
    };
  }, [editorValue]);

  return (
    <div onBlur={editorBlurHandler}>
      <CodeEditor
        height="calc(60vh)"
        language="graphql"
        theme="vs-dark"
        value={editorValue}
        onChange={codeChangeHandler}
        onBlur={editorBlurHandler}
        options={{
          fontSize: 14,
          formatOnType: true,
          minimap: {
            enabled: false,
            autohide: true,
          },
        }}
      />
    </div>
  );
};
