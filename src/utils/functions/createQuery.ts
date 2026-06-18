import { Query } from '@typesfolder/types';
import { getRandomID } from './getRandomID';

type Options = {
  name?: string;
  placeholderText?: string;
  value?: string;
  id?: string;
};

export function createQuery(placeholder: string, options?: Options): Query {
  const query = {
    name: '',
    placeholderText: placeholder || '',
    value: '',
    id: getRandomID(),
  };

  if (options) {
    Object.assign(query, options);
  }

  return query;
}
