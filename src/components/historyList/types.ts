import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

export interface HistoryItem {
  source: RESTful_METHODS | 'GRAPHQL';
  executedAt: number;
  baseUrl: string;
  url: string;
}

export interface HistoryUser {
  [key: string]: HistoryItem[];
}
