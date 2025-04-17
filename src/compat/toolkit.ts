import * as _toolkit from "./index.ts";

type Toolkit = typeof _toolkit;

export const toolkit: Toolkit & ((value: any) => any) = (value: any): any => {
  return value;
};

Object.assign(toolkit, _toolkit);
