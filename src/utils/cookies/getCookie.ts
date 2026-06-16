export interface IGetCookieResult {
  cookie: string | null;
  exists: boolean;
}

export const getCookie = (name: string): IGetCookieResult => {
  if (typeof document === 'undefined') {
    return { cookie: null, exists: false };
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift() || null;
    return { cookie, exists: !!cookie };
  }

  return { cookie: null, exists: false };
};
