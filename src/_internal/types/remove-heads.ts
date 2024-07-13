import { RemoveHead } from "./remove-head";

export type RemoveHeads<T, H extends any[]> = T extends [infer _ extends LiteralToPrimitive<H[0]>, ...infer Rest extends any[]] ? RemoveHeads<Rest, RemoveHead<H>> : T;
