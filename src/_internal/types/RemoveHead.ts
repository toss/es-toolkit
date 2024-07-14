/* eslint-disable @typescript-eslint/no-unused-vars */
import { OptionalToNullable } from './OptionalToNullable';

export type RemoveHead<T extends any[]> = OptionalToNullable<T> extends [infer Head, ...infer Rest] ? Rest : never;
