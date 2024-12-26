'use client';

import { ReactNode, useContext } from 'react';
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { UrlDocumentationContext } from '@/providers/UrlDocumentationProvider.tsx';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import '@graphiql/react/dist/style.css';

export default function DocExplorerWrapper(): ReactNode {
  const { url } = useContext(UrlDocumentationContext);

  return (
    <GraphiQLProvider fetcher={createGraphiQLFetcher({ url })}>
      <div className="graphiql-container">
        <DocExplorer />
      </div>
    </GraphiQLProvider>
  );
}
