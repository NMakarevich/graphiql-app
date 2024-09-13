const schemaQuery = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        description
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
`;

const getSchema = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({ query: schemaQuery }),
  });

  const statusCode = response.status;
  const statusText = response.statusText;

  if (response.ok) {
    const data = await response.json();
    return {
      data: data.data,
      statusCode,
      statusText,
    };
  } else {
    const errorMessage = `${statusCode} - ${statusText}`;
    throw new Error(errorMessage);
  }
};

export default getSchema;
