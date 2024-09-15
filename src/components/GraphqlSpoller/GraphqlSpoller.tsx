'use client';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel } from '../TabPanel/TabPanel';
import { createQuery } from '@/utils/functions/createQuery';
import type { SyntheticEvent } from 'react';
import styles from './GraphqlSpoller.module.scss';

const panels = [
  { text: 'Add the parameter', placeholder: 'parameter', title: 'Headers' },
  { text: 'Add the variable', placeholder: 'var', title: 'Variables' },
];

const defaultPanelsContent = Array.from({ length: panels.length }, (_, idx) =>
  panels.map((_, __, arr) => createQuery(arr[idx].placeholder))
);

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const GraphqlSpoller = () => {
  const [value, setValue] = useState<number>(0);
  const [content] = useState<Record<string, string>[][]>(defaultPanelsContent);
  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    e.stopPropagation();
    setValue(newValue);
  };

  return (
    <Accordion
      classes={{ root: styles.graphiql_spoller }}
      slotProps={{
        heading: { component: 'h2' },
        transition: { unmountOnExit: true },
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={
          <KeyboardArrowUpIcon
            classes={{ root: styles.graphiql_spoller_icon }}
          />
        }
        aria-controls="panel-content"
        id="panel-header"
        classes={{
          root: styles.graphiql_spoller_summary,
          content: styles.graphiql_spoller_summary_content,
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label={panels.reduce(
            (acc, panel) => (acc ? acc + ' & ' + panel.title : panel.title),
            ''
          )}
        >
          {panels.map((panel, index) => {
            return (
              <Tab
                key={panel.title}
                label={panel.title}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AccordionSummary>

      <AccordionDetails classes={{ root: styles.graphiql_spoller_details }}>
        {panels.map((panel, index) => (
          <TabPanel
            key={Math.random()}
            queries={content[index]}
            value={value}
            index={index}
            addText={panel.text}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
