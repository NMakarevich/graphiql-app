export const getServerCookie = (
  cookieHeader: string,
  name: string
): string | undefined => {
  const value = `; ${cookieHeader}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};
