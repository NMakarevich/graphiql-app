'use client';
import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import { QueryParameterView } from '../QueryParameterView/QueryParameterView';
import { createQuery } from '@/utils/functions/createQuery';
import type { SyntheticEvent } from 'react';
import type { contentArray, CustomTabPanelProps, TabPanelProps } from './types';
import type { Query } from '@typesfolder/types';

function CustomTabPanel({
  children,
  value,
  index,
  blurHandler,
  ...other
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      onBlur={blurHandler}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export const TabPanel: FC<TabPanelProps> = ({
  queries,
  value,
  index,
  addText = '+',
}) => {
  const router = useRouter();
  const path = usePathname();
  const isParameters = queries.every(
    (item) => item.placeholderText === 'parameter'
  );
  const searchParams = useSearchParams();
  const parameters: Query[] = [];

  searchParams.forEach((v, k) => {
    parameters.push(
      createQuery('parameter', {
        name: k,
        value: v,
      })
    );
  });

  const [content, setContent] = useState<contentArray>(
    parameters.length && isParameters ? parameters : queries
  );
  const [queriesState, setQueriesState] = useState<Query[]>(parameters);

  const blurHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    const newParams = new URLSearchParams();

    queriesState.forEach((it) => {
      newParams.set(it.name, it.value);
    });

    const fullPath = `${path}${queriesState.length ? '?' + newParams.toString() : ''}`;

    router.push(fullPath, { scroll: false });
  };

  const qUpdateHandler = (e: CustomEventInit) => {
    const { action, state } = e.detail;
    const isHas = queriesState.some((q) => q.id === state.id);

    if (action === 'add' && !isHas) {
      setQueriesState([...queriesState, state]);
    } else if (action === 'delete' && isHas) {
      setQueriesState((queries) => queries.filter((q) => q.id !== state.id));
    }
  };

  useEffect(() => {
    document.body.addEventListener('qupdate', qUpdateHandler);
  });

  return (
    <CustomTabPanel value={value} index={index} blurHandler={blurHandler}>
      <Button
        variant="outlined"
        onClick={() => {
          setContent([...content, createQuery('parameter')]);
        }}
        fullWidth
      >
        {addText}
      </Button>

      {content.map((item, idx) => (
        <QueryParameterView
          key={item.id}
          name={item.name}
          placeholderText={item.placeholderText}
          value={item.value}
          id={item.id}
          index={idx}
          onRemove={setContent}
          isChecked={!!parameters.length}
        />
      ))}
    </CustomTabPanel>
  );
};
