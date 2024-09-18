export interface SegmentProp {
  segment: string;
}

export type GraphQLresponse = {
  data: string;
  statusCode: string;
  statusText: string;
};

export interface SegmentsProp {
  urlSegment?: string;
  codeSegment?: string;
}

export interface EditorSegmentsProp extends SegmentsProp {
  graphqlFormAction: (prevState: string, data: FormData) => Promise<string>;
}
