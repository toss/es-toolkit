import { SizedTuple } from './SizedTuple';

export type Minus<A extends number, B extends number> =
  SizedTuple<A, 1> extends [...SizedTuple<B, 1>, ...infer R] ? R['length'] : never;
