import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';

export async function prettierGraphqlFormater(code: string) {
  const result = await prettier.format(code, {
    parser: 'graphql',
    plugins: [parserEstree, parserGraphql],
    endOfLine: 'auto',
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'always',
  });

  return result;
}
