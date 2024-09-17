import { FC } from 'react';
// import { graphqlSubmit } from '@/utils/actions/grapgql';
import { UrlInput } from '../UrlInput/UrlInput';
import { getParamsEntries } from '@/utils/functions/getParamsEntries';
import { varReplace } from '@/utils/functions/varReplace';
import type { SegmentsProp } from '@/types/interfaces';
import styles from './GraphqlForm.module.scss';

export const GraphqlForm: FC<SegmentsProp> = ({ urlSegment, codeSegment }) => {
  async function graphqlSubmit(data: FormData) {
    'use server';
    const dataEntries = Object.fromEntries(data);
    const dataArray = Object.entries(dataEntries);
    const { url } = dataEntries;
    const headersParams = getParamsEntries(dataArray, 'parameter');
    const varsParams = getParamsEntries(dataArray, 'var');
    const body = varReplace(codeSegment, varsParams);

    // ! ===========================Log====================================================
    console.log('data: ', data); // ! test
    console.log('url: ', url); // ! test
    console.log('headersObject: ', headersParams); // ! test
    console.log('varsParams: ', varsParams); // ! test
    console.log('body: ', body); // ! test
    // ! ===================================================================================
  }
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
