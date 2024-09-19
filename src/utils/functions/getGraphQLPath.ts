import { ROUTES } from '../constants/routes';

export function getGraphQLPath(
  lang: string,
  urlSegment: string = '',
  codeSegment: string = '',
  sqParams: string = ''
) {
  return `/${lang}${ROUTES.GRAPHIQL_PATH}${urlSegment ? '/' + encodeURIComponent(btoa(urlSegment)) : ''}${codeSegment ? '/' + encodeURIComponent(btoa(codeSegment)) : ''}${sqParams ? '?' + sqParams : ''}`;
}
