'use server';

export async function graphqlSubmit(data: FormData) {
  const { url } = Object.fromEntries(data);
  console.log('url: ', url); // ! test
  console.log('dataEntries: ', data); // ! test
}
