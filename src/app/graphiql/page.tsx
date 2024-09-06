'use client';

import getSchema from '@/utils/graphQL/getSchema/getSchema';
import { useEffect } from 'react';

const endpoint2 = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
const endpoint3 = 'https://countries.trevorblades.com/';

const query = `
    query {
      pokemon(name: "Pikachu") {
        id
        name
        classification
        types
      }
    }
    `;

const query2 = `
    query {
      allPeople {
        people {
          name
          birthYear
          species {
            name
          }
        }
      }
    }
    `;

const query3 = `
    query {
      country(code: "AT") {
        name
        capital
        currency
        languages {
          name
        }
      }
    }
    `;

function GraphiQL(): JSX.Element {
  const endpoint = 'https://graphql-pokemon2.vercel.app/';
  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        const resultSchema = await getSchema(endpoint);
        console.log(resultSchema);
        console.group(endpoint2, endpoint3, query2, query3, query);
      } catch (error) {
        const errorMessage = String((error as Error).message);
        console.error('getSchema Error:', error, errorMessage);
      }
    })();
  }, []);

  return <div>GraphiQL</div>;
}

export default GraphiQL;
