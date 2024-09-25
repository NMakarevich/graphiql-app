'use client';

import { Control, Controller } from 'react-hook-form';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import RESTful from '@components/restfulLayout/types.ts';
import { useTranslation } from 'react-i18next';

function RestfulHeader({ control }: { control: Control<RESTful> }) {
  const { t } = useTranslation();

  return (
    <>
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
        {t('restfulSend')}
      </Button>
    </>
  );
}

export default RestfulHeader;
