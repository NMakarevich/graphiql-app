import { Control, Controller } from 'react-hook-form';
import RESTful from '@components/restfulLayout/types.ts';
import Grid from '@mui/material/Grid2';
import styles from '@components/restfulLayout/restfulLayout.module.scss';
import { Button, Typography } from '@mui/material';
import CodeMirrorEditor from '@components/codeMirrorEditor/codeMirrorEditor.tsx';
import ResponseStatus from '@components/responseStatus/responseStatus.tsx';

interface Props {
  control: Control<RESTful>;
  responseStatus: number;
  response: string;
  onPrettify: () => void;
}

function RestfulReqRes(props: Props) {
  const { control, responseStatus, response, onPrettify } = props;

  return (
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
  );
}

export default RestfulReqRes;
