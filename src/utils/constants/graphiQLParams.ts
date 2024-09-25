export const endpoint = 'https://graphql-pokemon2.vercel.app/';
export const endpointTwo =
  'https://swapi-graphql.netlify.app/.netlify/functions/index';
export const endpointThree = 'https://countries.trevorblades.com/';

export const headers = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'User-Agent': 'MyGraphQLClient/1.0',
  Authorization: '',
};
export const headersTwo = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'User-Agent': 'MyGraphQLClient/1.0',
  Authorization: '',
};
export const headersThree = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
};

export const query = `
query {
  pokemon(name: "Pikachu") {
    id
    name
    classification
    types
  }
}
`;
export const queryTwo = `
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
export const queryThree = `
query {
  country(code: "AU") {
    name
    capital
    currency
    languages {
      name
    }
  }
}
`;
