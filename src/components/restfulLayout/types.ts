import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

export default interface RESTful {
  method: RESTful_METHODS;
  baseURL: string;
  headers: RESTfulHeaders;
  body: string;
}

interface RESTfulHeaders {
  selected: { isSelected: boolean }[];
  keys: { key: string }[];
  values: { value: string }[];
}
