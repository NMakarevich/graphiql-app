'use client';

import { Control, Controller, useFieldArray } from 'react-hook-form';
import RESTful from '@components/restfulLayout/types.ts';
import styles from '@components/restfulLayout/restfulLayout.module.scss';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

function RestfulRequestHeaders({ control }: { control: Control<RESTful> }) {
  const { t } = useTranslation();

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

  function addHeader() {
    appendSelected({ isSelected: true });
    appendKey({ key: '' });
    appendValue({ value: '' });
  }
  return (
    <>
      <header className={styles.SectionHeader}>
        <Typography variant={'h4'} sx={{ padding: '10px 0' }}>
          {t('restfulHeadersSectionTitle')}({selectedFields.length})
        </Typography>
        <Button type="button" onClick={addHeader}>
          <AddIcon />
          {t('restfulAddHeaderButton')}
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
    </>
  );
}

export default RestfulRequestHeaders;
