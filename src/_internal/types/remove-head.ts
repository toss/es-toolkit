// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RemoveHead<T> = T extends [infer _, ...infer Rest] ? Rest : T;
