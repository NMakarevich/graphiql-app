import { Metadata } from 'next';
import { Typography } from '@mui/material';
import { GraphqlForm } from '@/components/GraphqlForm/GraphqlForm';
import type { Params } from './types';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'GraphQL',
  description: 'GraphQL',
};

export default function GraphQLLayout({
  children,
  params,
}: Params): JSX.Element {
  const { data } = params;
  const decodedData = data
    ? data.map((param) => atob(decodeURIComponent(param)))
    : [];
  const urlSegment = decodedData.find((d) => !d.includes('{'));
  const codeSegment = decodedData.find((d) => d.includes('{'));

  return (
    <section className={styles.graphiql}>
      <section className={styles.graphiql_header}>
        <Typography component="h1" classes={{ root: styles.graphiql_title }}>
          GraphiQL Client
        </Typography>

        <GraphqlForm urlSegment={urlSegment} codeSegment={codeSegment} />
      </section>

      {children}
    </section>
  );
}
