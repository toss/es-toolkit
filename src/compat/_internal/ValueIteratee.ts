export type ValueIteratee<T> =
  | ((value: T) => unknown)
  | PropertyKey
  | readonly PropertyKey[]
  | [PropertyKey | readonly PropertyKey[], any]
  | Partial<T>;
