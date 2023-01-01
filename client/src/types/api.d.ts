type Person = {
  name: string;
  email: string;
  label: "customer" | "employee";
  id: string;
};

type SearchResult = {
  _index: string;
  _id: string;
  _score: number;
  _source: Omit<Person, "id">;
};

export { Person, SearchResult };
