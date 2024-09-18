export function varReplace(
  body: string = '',
  object: Record<string, string> = {}
) {
  return body.replace(/{{(\w+)}}/g, (_, key) => {
    return isNaN(parseInt(object[key])) ? `${object[key]}` : object[key] || '';
  });
}
