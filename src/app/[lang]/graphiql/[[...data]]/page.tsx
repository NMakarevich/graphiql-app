import classNames from 'classnames';
import { GraphqlEditor } from '@/components/GraphqlEditor/GraphqlEditor';
import { Submit } from '@/components/Submit/Submit';
import { Documentation } from '@/components/Documentation/Documentation';
import { Prettify } from '@/components/Prettify/Prettify';
import { QueryResponsePanel } from '@/components/QueryResponsePanel/QueryResponsePanel';
import { GraphqlSpoller } from '@/components/GraphqlSpoller/GraphqlSpoller';
import Card from '@mui/material/Card';
import { Spoller } from '@typesfolder/types';
import styles from './page.module.scss';

const spollers = [
  {
    addButtontext: 'headers.button',
    placeholder: 'parameter',
    title: 'headers.title',
  },
  {
    addButtontext: 'variables.button',
    placeholder: 'var',
    title: 'variables.title',
  },
];

function GraphiQL({
  params,
}: {
  params: { data: string[]; lang: string };
}): JSX.Element {
  const { data, lang } = params;
  const decodedData = data
    ? data.map((param) => atob(decodeURIComponent(param)))
    : [];
  const urlSegment = decodedData.find((d) => !d.includes('{'));
  const codeSegment = decodedData.find((d) => d.includes('{'));

  return (
    <div className={styles.graphiql_editors}>
      <Card
        variant="outlined"
        className={classNames(
          [styles.graphiql_editors_card],
          [styles.graphiql_editors_card_non_bottom]
        )}
      >
        <GraphqlEditor
          urlSegment={urlSegment}
          codeSegment={codeSegment}
          lang={lang}
        />

        <hr className={styles.graphiql_editors_separator} />

        {spollers.map((spoller: Spoller, index) => (
          <GraphqlSpoller key={spoller.title} spoller={spoller} index={index} />
        ))}
      </Card>

      <Card
        variant="outlined"
        className={classNames(
          [styles.graphiql_editors_card],
          [styles.graphiql_editors_bar]
        )}
      >
        <Submit />
        <Prettify />
        <Documentation />
      </Card>

      <Card
        variant="outlined"
        className={classNames([styles.graphiql_editors_card])}
      >
        <QueryResponsePanel />
      </Card>
    </div>
  );
}

export default GraphiQL;
