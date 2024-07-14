export type ValueOf<T> = T extends Record<PropertyKey, infer V> ? V : never;
