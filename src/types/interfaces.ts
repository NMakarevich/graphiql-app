export interface SegmentProp {
  segment: string;
}

export type GraphQLresponse = {
  data: string;
  statusCode: string;
  statusText: string;
};

export interface GraphQLDoc {
  queryType?: {
    name: string;
  };
  mutationType?: null;
  subscriptionType?: null;
  types?: GraphQLDocType[];
}

export interface IDocumentationContext {
  documentation?: GraphQLDoc;
  setDocumentation: (documentation: {}) => void;
}

export type Kind =
  | 'OBJECT'
  | 'SCALAR'
  | 'ENUM'
  | 'LIST'
  | 'NON_NULL'
  | 'INPUT_OBJECT';

export interface GraphQLDocType {
  name: string;
  description: string;
  kind: Kind;
  fields: GraphQLDocField[] | null;
}

export interface GraphQLDocField {
  name: string;
  description: string;
  type: GraphQLDocFieldType;
  args: GraphQLDocArg[];
}

export interface GraphQLDocFieldType {
  kind: Kind;
  name: string | null;
  ofType: GraphQLDocOfType | null;
}

export interface GraphQLDocArg {
  name: string;
  description: string;
  type: GraphQLDocFieldType;
}

export interface GraphQLDocOfType {
  kind: Kind;
  name: string | null;
  ofType: GraphQLDocOfType | null;
}

export interface SegmentsProp {
  urlSegment?: string;
  codeSegment?: string;
  lang?: string;
}

export interface EditorSegmentsProp extends SegmentsProp {
  graphqlFormAction: (prevState: string, data: FormData) => Promise<string>;
}
