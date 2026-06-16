import type { Dispatch, SetStateAction } from 'react';

export type stateArray = Record<string, string>[];

export interface QueryParameterViewProps {
  name: string;
  placeholderText: string;
  value: string;
  id: string;
  index: number;
  onRemove: Dispatch<SetStateAction<stateArray>>;
  isChecked: boolean;
}
