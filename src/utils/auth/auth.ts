export const isAuthenticated: Promise<boolean> = new Promise(
  (resolve, reject): void => {
    try {
      const isAuthenticated = true;
      setTimeout((): void => resolve(isAuthenticated), 1000);
    } catch (error) {
      reject(error);
    }
  }
);
