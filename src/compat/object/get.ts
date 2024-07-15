import { get } from "lodash";

get({ a: {b: {c: {}}}, 'a.b.c')

// export function get<T, K extends keyof T>(object: T, path: K | [K]): TObject[TKey];
// export function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: K | [K]): TObject[TKey];
