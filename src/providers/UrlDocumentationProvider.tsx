'use client';

import { createContext, ReactNode, useState } from 'react';
import { IUrlDocumentationContext } from '@/types/interfaces.ts';

export const UrlDocumentationContext = createContext<IUrlDocumentationContext>({
  url: '',
  setUrl: (url: string) => url,
});

export function UrlDocumentationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [url, setUrl] = useState<string>('');

  return (
    <UrlDocumentationContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlDocumentationContext.Provider>
  );
}
