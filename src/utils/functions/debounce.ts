/* eslint-disable no-unused-vars */
export function debounce<T extends (...args: Parameters<T>) => unknown>(
  this: ThisParameterType<T>,
  fn: T,
  delay: number = 250
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
