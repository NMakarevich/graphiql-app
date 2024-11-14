export interface DocaLine {
  name: string | null;
  kind?: string;
  description?: string | null;
  ofType?: DocaLine | null;
  fields?: DocaLine[] | null;
  inputFields?: DocaLine[] | null;
  enumValues?: DocaLine[] | null;
  text?: string | null;
  type?: DocaLine | null;
}

export type DocumentationBody = {
  __schema: {
    types: DocaLine[];
  };
};

export type DocumentationBodyResponse = {
  data: DocumentationBody;
  statusCode: number;
  statusText: string;
};
