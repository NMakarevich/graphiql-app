export const encodeBase64 = (value: string) => {
  try {
    return btoa(value).replaceAll('/', '-');
  } catch {
    return '';
  }
};

export const decodeBase64 = (value: string) => {
  try {
    return atob(value.replaceAll('-', '/'));
  } catch {
    return '';
  }
};
