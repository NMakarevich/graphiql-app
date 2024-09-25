export type Query = {
  name: string;
  placeholderText: string;
  value: string;
  id: string;
};

export type Data = {
  action: string;
  state: Query;
};

export type Spoller = {
  addButtontext: string;
  placeholder: string;
  title: string;
};
