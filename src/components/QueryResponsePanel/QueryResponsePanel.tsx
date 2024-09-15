import styles from './QueryResponsePanel.module.scss';

const json = JSON.stringify({ test: true }, null, 2);

export const QueryResponsePanel = () => {
  return (
    <textarea
      className={styles.graphiql_editors_result}
      value={json}
      readOnly={true}
    />
  );
};
