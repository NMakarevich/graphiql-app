'use client';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AccordionContent } from '../AccordionContent/AccordionContent';
import { createQuery } from '@/utils/functions/createQuery';
import type { FC, SyntheticEvent } from 'react';
import type { GraphqlSpollerProps } from './types';
import styles from './GraphqlSpoller.module.scss';

export const GraphqlSpoller: FC<GraphqlSpollerProps> = ({ spoller, index }) => {
  const defaultPanelsContent = Array.from({ length: 2 }, () =>
    createQuery(spoller.placeholder)
  );
  const [content] = useState<Record<string, string>[]>(defaultPanelsContent);

  const [onExpanded, setOnExpanded] = useState<boolean>(false);

  const handleChange = () => (_e: SyntheticEvent, newExpanded: boolean) => {
    setOnExpanded(newExpanded);
  };

  return (
    <Accordion
      key={Math.random()}
      classes={{ root: styles.graphiql_spoller }}
      slotProps={{
        heading: { component: 'h2' },
      }}
      {...(spoller.placeholder === 'parameter'
        ? { onChange: handleChange() }
        : {})}
      {...(spoller.placeholder === 'parameter' ? { expanded: onExpanded } : {})}
      disableGutters
    >
      <AccordionSummary
        expandIcon={
          <KeyboardArrowUpIcon
            classes={{ root: styles.graphiql_spoller_icon }}
          />
        }
        aria-controls={`panel-content-${index}`}
        id={`panel-header-${index}`}
        classes={{
          root: styles.graphiql_spoller_summary,
          content: styles.graphiql_spoller_summary_content,
        }}
      >
        {spoller.title}
      </AccordionSummary>

      <AccordionDetails classes={{ root: styles.graphiql_spoller_details }}>
        <AccordionContent queries={content} addText={spoller.addButtontext} />
      </AccordionDetails>
    </Accordion>
  );
};
