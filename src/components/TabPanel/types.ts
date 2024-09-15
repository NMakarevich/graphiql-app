import { PropsWithChildren } from 'react';
import type { FocusEventHandler } from 'react';

export type contentArray = Record<string, string>[];

export interface TabPanelProps {
  index: number;
  value: number;
  queries: contentArray;
  addText: string;
}

export interface CustomTabPanelProps extends PropsWithChildren {
  index: number;
  value: number;
  blurHandler: FocusEventHandler<HTMLDivElement>;
}
