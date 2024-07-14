/* eslint-disable @typescript-eslint/no-unused-vars */
import { OptionalToNullable } from './optional-to-nullable';

export type RemoveHead<T extends any[]> = OptionalToNullable<T> extends [infer Head, ...infer Rest] ? Rest : never;
