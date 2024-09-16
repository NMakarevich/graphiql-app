import { Typography } from '@mui/material';
import RestfulLayout from '@components/restfulLayout/restfulLayout.tsx';
import styles from './page.module.scss';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';
import { notFound } from 'next/navigation';

function RESTfullClient({
  params,
}: {
  params: { method: string };
}): JSX.Element {
  const methods: string[] = Object.values(RESTful_METHODS);

  if (!methods.includes(params.method)) notFound();

  return (
    <div className={styles.Page}>
      <Typography variant={'h2'}>RESTful Client</Typography>
      <RestfulLayout />
    </div>
  );
}

export default RESTfullClient;
