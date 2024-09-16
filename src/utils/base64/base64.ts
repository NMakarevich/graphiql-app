export const encodeBase64 = (value: string) => {
  try {
    return btoa(value);
  } catch {
    return '';
  }
};

export const decodeBase64 = (value: string) => {
  try {
    return atob(value);
  } catch {
    return '';
  }
};
