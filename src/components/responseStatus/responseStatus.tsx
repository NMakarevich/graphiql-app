import { InputAdornment } from '@mui/material';

function ResponseStatus({ status }: { status: number }) {
  return (
    <InputAdornment
      sx={{
        alignSelf: 'flex-end',
        color: Math.ceil(status / 100) === 2 ? '#4caf50' : '#F2B8B5',
      }}
      position="end"
    >
      {status ? status : ''}
    </InputAdornment>
  );
}

export default ResponseStatus;
