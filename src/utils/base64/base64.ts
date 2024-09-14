export const encodeBase64 = (value: string) => {
  return btoa(value);
};

export const decodeBase64 = (value: string) => {
  return atob(value);
};
