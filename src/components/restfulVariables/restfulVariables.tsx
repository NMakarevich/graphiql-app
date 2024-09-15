'use client';

import { Control, Controller, useFieldArray } from 'react-hook-form';
import RESTful from '@components/restfulLayout/types.ts';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '@components/restfulLayout/restfulLayout.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

function RestfulVariables({ control }: { control: Control<RESTful> }) {
  const { t } = useTranslation();

  const { fields: variablesKeys, append: appendVariablesKeys } = useFieldArray({
    control,
    name: 'variables.keys',
  });

  const { append: appendVariablesValues } = useFieldArray({
    control,
    name: 'variables.values',
  });

  function addVariable() {
    appendVariablesKeys({ key: '' });
    appendVariablesValues({ value: '' });
  }

  return (
    <>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <header className={styles.SectionHeader}>
            <Typography variant={'h4'} sx={{ padding: '10px 0' }}>
              {t('restfulVariablesSectionTitle')}({variablesKeys.length})
            </Typography>
          </header>
        </AccordionSummary>
        <AccordionDetails>
          <Button type="button" onClick={addVariable}>
            <AddIcon />
            {t('restfulAddVariableButton')}
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
                  <TableCell align="left">{t('restfulKey')}</TableCell>
                  <TableCell align="left">{t('restfulValue')}</TableCell>
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
    </>
  );
}

export default RestfulVariables;
