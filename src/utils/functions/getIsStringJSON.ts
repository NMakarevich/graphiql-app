/* eslint-disable @typescript-eslint/no-unused-vars */
export function getIsStringJSON(str: string) {
  try {
    JSON.parse(str);
  } catch (e: unknown) {
    return false;
  }
  return true;
}
