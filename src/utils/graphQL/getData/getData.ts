export const getData = async (
  endpoint: string,
  headers: Record<string, string>,
  query: string
) => {
  const nonEmptyHeaders = Object.fromEntries(
    Object.entries(headers).filter(([, value]) => value !== '')
  );

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...nonEmptyHeaders,
    },
    mode: 'cors',
    body: query ? JSON.stringify({ query }) : undefined,
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
    const errorMessage = JSON.stringify({ code: statusCode, text: statusText });
    throw new Error(errorMessage);
  }
};
