import { LiteralToPrimitive } from './litral-to-primitive';
import { RemoveHead } from './remove-head';

export type RemoveHeads<T, H extends any[]> = T extends [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _ extends LiteralToPrimitive<H[0]>,
  ...infer Rest extends any[],
]
  ? RemoveHeads<Rest, RemoveHead<H>>
  : T;
