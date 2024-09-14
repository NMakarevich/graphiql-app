'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './restfulLayout.module.scss';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import RESTful from '@components/restfulLayout/types.ts';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateURL, parseURL, prettify } from '@/utils/restful/restful.ts';
import { useState } from 'react';
import ResponseStatus from '@components/responseStatus/responseStatus.tsx';
import request from '@/utils/request/request.ts';
import CodeMirrorEditor from '@components/codeMirrorEditor/codeMirrorEditor.tsx';
import { useLocalStorage } from '@hooks/useLocalStorage.ts';
import { saveToHistory } from '@/utils/history/history.ts';

function RestfulLayout(): JSX.Element {
  const url = usePathname();
  const searchParams = useSearchParams();
  const [responseStatus, setResponseStatus] = useState(0);
  const [response, setResponse] = useState('');
  const [localStorage, setLocalStorage] = useLocalStorage('history');

  const { control, handleSubmit, getValues, setValue } = useForm<RESTful>({
    defaultValues: { ...parseURL(url, searchParams.toString()) },
    mode: 'onSubmit',
  });

  const { fields: selectedFields, append: appendSelected } = useFieldArray({
    control,
    name: 'headers.selected',
  });
  const { append: appendKey } = useFieldArray({
    control,
    name: 'headers.keys',
  });
  const { append: appendValue } = useFieldArray({
    control,
    name: 'headers.values',
  });

  const { fields: variablesKeys, append: appendVariablesKeys } = useFieldArray({
    control,
    name: 'variables.keys',
  });

  const { append: appendVariablesValues } = useFieldArray({
    control,
    name: 'variables.values',
  });

  async function onSubmit(data: RESTful) {
    setResponse('');
    try {
      const response = await request(data);
      const status = response.status;
      const json = await response.json();
      setResponseStatus(status);
      setResponse(JSON.stringify(json, null, 2));
      setLocalStorage(saveToHistory(data, localStorage));
    } catch (error) {
      if (error instanceof Error) {
        setResponse(JSON.stringify({ error: error.message }, null, 2));
      }
    }
  }

  function onBlur() {
    const data = getValues();
    const url = generateURL(data);
    window.history.replaceState(null, '', url);
  }

  function addHeader() {
    appendSelected({ isSelected: true });
    appendKey({ key: '' });
    appendValue({ value: '' });
  }

  function addVariable() {
    appendVariablesKeys({ key: '' });
    appendVariablesValues({ value: '' });
  }

  function onPrettify() {
    const body = getValues('body');
    const formattedBody = prettify(body);
    setValue('body', formattedBody);
    onBlur();
  }

  return (
    <Paper sx={{ width: '100%', padding: '10px' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onBlur={onBlur}
        className={`${styles.Form} ${styles.Flex} ${styles.FlexColumn}`}
      >
        <header className={`${styles.Header} ${styles.Flex}`}>
          <Controller
            name={'method'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                sx={{ width: 110, '.MuiSelect-select': { padding: '10px' } }}
                id="method-select"
                value={value}
                onChange={onChange}
              >
                {Object.values(RESTful_METHODS).map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name={'baseURL'}
            control={control}
            rules={{
              required: { value: true, message: 'Please enter a URL.' },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{
                  '& .MuiInputBase-input': { padding: '10px' },
                  '& .MuiFormHelperText-root': {
                    position: 'absolute',
                    bottom: '-22px',
                  },
                }}
                name={'baseURL'}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                value={value}
                placeholder="Base URL"
                fullWidth
              />
            )}
          />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </header>
        <main className={`${styles.Main} ${styles.Flex} ${styles.FlexColumn}`}>
          <section
            className={`${styles.Section} ${styles.Flex} ${styles.FlexColumn}`}
          >
            <header className={styles.SectionHeader}>
              <Typography variant={'h4'} sx={{ padding: '10px 0' }}>
                Headers ({selectedFields.length})
              </Typography>
              <Button type="button" onClick={addHeader}>
                <AddIcon /> Add header
              </Button>
            </header>
            <TableContainer sx={{ maxHeight: 175 }}>
              <Table
                sx={{
                  '.MuiTableCell-root:first-child': { width: 36 },
                  '.MuiTableCell-root:not(:first-child)': {
                    borderLeft: '1px solid #E6E0E9',
                  },
                }}
              >
                <TableHead
                  sx={{
                    borderBottom: '1px solid #E6E0E9',
                    '& .MuiTableCell-root': { padding: '5px' },
                  }}
                >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Key</TableCell>
                    <TableCell align="left">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    '& .MuiTableCell-root': { padding: '2px' },
                    '& .MuiInputBase-input': {
                      padding: '5px',
                    },
                  }}
                >
                  {selectedFields.map((selected, index) => (
                    <TableRow
                      key={selected.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Controller
                          control={control}
                          name={`headers.selected.${index}.isSelected`}
                          render={({ field: { onChange, value } }) => (
                            <Checkbox
                              name={`headers.selected.${index}.isSelected`}
                              value={value}
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Controller
                          control={control}
                          name={`headers.keys.${index}.key`}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              type="text"
                              name={`headers.keys.${index}`}
                              onChange={onChange}
                              value={value}
                              fullWidth
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Controller
                          control={control}
                          name={`headers.values.${index}.value`}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              type="text"
                              name={`headers.values[${index}].value`}
                              onChange={onChange}
                              value={value}
                              fullWidth
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <section
            className={`${styles.Section} ${styles.Flex} ${styles.FlexColumn}`}
          >
            <Accordion disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <header className={styles.SectionHeader}>
                  <Typography variant={'h4'} sx={{ padding: '10px 0' }}>
                    Variables ({variablesKeys.length})
                  </Typography>
                </header>
              </AccordionSummary>
              <AccordionDetails>
                <Button type="button" onClick={addVariable}>
                  <AddIcon /> Add variable
                </Button>
                <TableContainer sx={{ maxHeight: 175 }}>
                  <Table
                    sx={{
                      '.MuiTableCell-root:not(:first-child)': {
                        borderLeft: '1px solid #E6E0E9',
                      },
                    }}
                  >
                    <TableHead
                      sx={{
                        borderBottom: '1px solid #E6E0E9',
                        '& .MuiTableCell-root': { padding: '5px' },
                      }}
                    >
                      <TableRow>
                        <TableCell align="left">Key</TableCell>
                        <TableCell align="left">Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': { padding: '2px' },
                        '& .MuiInputBase-input': {
                          padding: '5px',
                        },
                      }}
                    >
                      {variablesKeys.map((key, index) => (
                        <TableRow
                          key={key.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="left">
                            <Controller
                              control={control}
                              name={`variables.keys.${index}.key`}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  type="text"
                                  name={`variables.keys.${index}.key`}
                                  onChange={onChange}
                                  value={value}
                                  fullWidth
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Controller
                              control={control}
                              name={`variables.values.${index}.value`}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  type="text"
                                  name={`variables.values[${index}].value`}
                                  onChange={onChange}
                                  value={value}
                                  fullWidth
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </section>
          <Divider />
          <Grid container columnSpacing={1} sx={{ width: '100%' }}>
            <Grid
              size={{ md: 6, xs: 12 }}
              className={`${styles.Flex} ${styles.FlexColumn}`}
            >
              <header className={`${styles.SectionHeader} ${styles.Flex}`}>
                <Typography variant={'h4'}>Body</Typography>
                <Button type="button" onClick={onPrettify}>
                  Prettify
                </Button>
              </header>
              <Controller
                name={'body'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CodeMirrorEditor value={value} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid
              size={{ md: 6, xs: 12 }}
              className={`${styles.Flex} ${styles.FlexColumn}`}
            >
              <header className={`${styles.SectionHeader} ${styles.Flex}`}>
                <Typography variant={'h4'}>Response</Typography>
                <ResponseStatus status={responseStatus} />
              </header>
              <CodeMirrorEditor value={response} readonly={true} />
            </Grid>
          </Grid>
        </main>
      </form>
    </Paper>
  );
}

export default RestfulLayout;
