import { Metadata } from 'next';
import { Typography } from '@mui/material';
import { GraphqlForm } from '@/components/GraphqlForm/GraphqlForm';
import { getData } from '@/utils/graphQL/getData/getData';
import { varReplace } from '@/utils/functions/varReplace';
import { getParamsEntries } from '@/utils/functions/getParamsEntries';
import { defaultSchemaQuery } from '@/utils/constants/graphQLDefaultTemplates';
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

  async function graphqlSubmit(_prevState: unknown, data: FormData) {
    'use server';
    const dataEntries = Object.fromEntries(data);
    const dataArray = Object.entries(dataEntries);
    const { url } = dataEntries;
    const headersParams = getParamsEntries(dataArray, 'parameter');
    const varsParams = getParamsEntries(dataArray, 'var');
    const body = varReplace(codeSegment || defaultSchemaQuery, varsParams);

    try {
      const response = await getData(url as string, headersParams, body);
      return JSON.stringify(response, null, 2);
    } catch (err) {
      return JSON.stringify(
        {
          error: (err as Error).message,
          statusCode: '',
          statusText: (err as Error).cause,
        },
        null,
        2
      );
    }
  }

  return (
    <section className={styles.graphiql}>
      <section className={styles.graphiql_header}>
        <Typography component="h1" classes={{ root: styles.graphiql_title }}>
          GraphiQL Client
        </Typography>

        <GraphqlForm
          urlSegment={urlSegment}
          codeSegment={codeSegment}
          graphqlFormAction={graphqlSubmit}
        />
      </section>

      {children}
    </section>
  );
}
