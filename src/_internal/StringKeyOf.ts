export type StringKeyOf<T> =
  | Extract<keyof T, string>
  | (number extends keyof T ? string : `${Extract<keyof T, number>}`);
