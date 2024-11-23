'use client';
import { createContext, useState } from 'react';
import { GraphQLDoc, IDocumentationContext } from '@/types/interfaces.ts';

export const DocumentationContext = createContext<IDocumentationContext>({
  documentation: {},
  setDocumentation: (documentation) => documentation,
});

export default function DocumentationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [documentation, setDocumentation] = useState<GraphQLDoc>({});

  return (
    <DocumentationContext.Provider value={{ documentation, setDocumentation }}>
      {children}
    </DocumentationContext.Provider>
  );
}
