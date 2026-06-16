export const setAuthCookie = (
  name: string,
  value: string,
  hours: number
): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
};
