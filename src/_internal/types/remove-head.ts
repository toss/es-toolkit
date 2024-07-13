export type RemoveHead<T> = T extends [infer _, ...infer Rest] ? Rest : T;
