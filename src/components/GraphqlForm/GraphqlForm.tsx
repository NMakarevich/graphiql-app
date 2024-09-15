import { FC } from 'react';
import { graphqlSubmit } from '@/utils/actions/grapgql';
import { UrlInput } from '../UrlInput/UrlInput';
import type { SegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';

export const GraphqlForm: FC<SegmentsProp> = ({ urlSegment, codeSegment }) => {
  return (
    <form
      action={graphqlSubmit}
      id="graphql"
      name="graphql"
      className={styles.graphql_form}
    >
      <UrlInput
        classes={styles.graphql_form_url}
        urlSegment={urlSegment}
        codeSegment={codeSegment}
      />
    </form>
  );
};
