import { PropsWithChildren } from 'react';

export interface Params extends PropsWithChildren {
  params: {
    data: string[];
    lang: string;
  };
}
