export function getParamsEntries(
  array: [string, FormDataEntryValue][],
  startString: string
) {
  const entries = array
    .filter(([param]) => param.startsWith(`${startString}-`))
    .map(([k, v], _, arr) => {
      const idNumber = k.at(-1);
      const valueArray = arr.find(
        ([t]) =>
          t.startsWith(`${startString}-value-`) && t.endsWith(idNumber || '0')
      );
      const [, value] = valueArray || [];

      return [v, value];
    })
    .filter(([k, v]) => k !== v);

  return Object.fromEntries(entries);
}
