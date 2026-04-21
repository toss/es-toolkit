type Simplify<T> = { [K in keyof T]: T[K] } & {};

type BuiltIn =
  | Date
  | RegExp
  | Map<unknown, unknown>
  | Set<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>
  | Promise<unknown>
  | Error
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | ((...args: never[]) => unknown);

// Index Signature helpers
type PickIndexSignature<T> = {
  [K in keyof T as string extends K ? K : number extends K ? K : never]: T[K];
};

type OmitIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

type GetStringIndex<T> = string extends keyof T ? T[string] : never;
type GetNumberIndex<T> = number extends keyof T ? T[number] : never;
type MergeIndexedValues<T, S> = [T] extends [never] ? S : [S] extends [never] ? T : MergeDeep<T, S>;

type MergeIndexSignatures<T, S> = Simplify<
  (string extends keyof PickIndexSignature<T> | keyof PickIndexSignature<S>
    ? { [x: string]: MergeIndexedValues<GetStringIndex<PickIndexSignature<T>>, GetStringIndex<PickIndexSignature<S>>> }
    : {}) &
  (number extends keyof PickIndexSignature<T> | keyof PickIndexSignature<S>
    ? { [x: number]: MergeIndexedValues<GetNumberIndex<PickIndexSignature<T>>, GetNumberIndex<PickIndexSignature<S>>> }
    : {})
>;

// Optional/Required key helpers
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

// Tuple helpers
type Head<T> = T extends readonly [infer H, ...infer _] ? H : never;
type Tail<T> = T extends readonly [infer _, ...infer Rest] ? Rest : never;

type IsTuple<T> = T extends readonly unknown[]
  ? number extends T['length']
    ? false
    : true
  : false;

type MergeArrayElements<T extends readonly unknown[], S extends readonly unknown[]> =
  | T[number]
  | S[number]
  | MergeDeep<T[number], S[number]>;

type MergeArrays<T extends readonly unknown[], S extends readonly unknown[]> = T extends []
  ? S
  : S extends []
    ? T
    : [MergeDeep<Head<T>, Head<S>>, ...MergeArrays<Tail<T>, Tail<S>>];

// Merge literal keys deeply
type _MergeLiteralObjects<T, S> = Simplify<{
  [K in RequiredKeys<T> | RequiredKeys<S>]: K extends keyof S
    ? K extends keyof T
      ? MergeDeep<T[K], S[K]>
      : S[K]
    : K extends keyof T
      ? T[K]
      : never;
} & {
  [K in OptionalKeys<T> | OptionalKeys<S>]?: K extends keyof S
    ? K extends keyof T
      ? MergeDeep<T[K], S[K]>
      : S[K]
    : K extends keyof T
      ? T[K]
      : never;
}>;

// Combine index signatures with deep literal merge
type _MergeObjects<T, S> = Simplify<
  MergeIndexSignatures<T, S> & _MergeLiteralObjects<OmitIndexSignature<T>, OmitIndexSignature<S>>
>;

export type MergeDeep<T, S> =
  S extends undefined
    ? T
    : T extends null
      ? S
      : S extends BuiltIn
        ? S
        : T extends BuiltIn
          ? S
          : T extends readonly unknown[]
            ? S extends readonly unknown[]
              ? IsTuple<T> extends true
                ? IsTuple<S> extends true
                  ? MergeArrays<T, S>
                  : Array<MergeArrayElements<T, S>>
                : Array<MergeArrayElements<T, S>>
              : S extends object
                ? T & S
                : S
            : T extends object
              ? S extends object
                ? _MergeObjects<T, S>
                : S
              : S;
