type GetFieldTypeOfArrayLikeByKey<T extends unknown[], K> = K extends number
  ? T[K]
  : K extends `${infer N extends number}`
    ? T[N]
    : K extends keyof T
      ? T[K]
      : undefined;

type GetFieldTypeOfStringByKey<T extends string, K> = K extends number
  ? T[K]
  : K extends `${infer N extends number}`
    ? T[N]
    : K extends keyof T
      ? T[K]
      : undefined;

type GetFieldTypeOfNarrowedByKey<T, K> = T extends unknown[]
  ? GetFieldTypeOfArrayLikeByKey<T, K>
  : T extends string
    ? GetFieldTypeOfStringByKey<T, K>
    : K extends keyof T
      ? T[K]
      : K extends number
        ? `${K}` extends keyof T
          ? T[`${K}`]
          : undefined
        : K extends `${infer N extends number}`
          ? N extends keyof T
            ? T[N]
            : undefined
          : undefined;

type GetFieldTypeOfNarrowedByDotPath<T, P> = P extends `${infer L}.${infer R}`
  ? GetFieldType<GetFieldTypeOfNarrowedByKey<T, L>, R, 'DotPath'>
  : GetFieldTypeOfNarrowedByKey<T, P>;

type GetFieldTypeOfNarrowedByLcKR<T, Lc, K, R> = '' extends R
  ? GetFieldType<GetFieldTypeOfNarrowedByDotPath<T, Lc>, K, 'Key'>
  : R extends `.${infer Rc}`
    ? GetFieldType<GetFieldType<GetFieldTypeOfNarrowedByDotPath<T, Lc>, K, 'Key'>, Rc>
    : GetFieldType<GetFieldType<GetFieldTypeOfNarrowedByDotPath<T, Lc>, K, 'Key'>, R>;

type GetFieldTypeOfNarrowedByLKR<T, L, K, R> = '' extends L
  ? '' extends R
    ? GetFieldTypeOfNarrowedByKey<T, K>
    : R extends `.${infer Rc}`
      ? GetFieldType<GetFieldTypeOfNarrowedByKey<T, K>, Rc>
      : GetFieldType<GetFieldTypeOfNarrowedByKey<T, K>, R>
  : L extends `${infer Lc}.`
    ? GetFieldTypeOfNarrowedByLcKR<T, Lc, K, R>
    : GetFieldTypeOfNarrowedByLcKR<T, L, K, R>;

type GetFieldTypeOfNarrowed<T, X, XT extends 'DotPath' | 'Key' | 'Path'> = XT extends 'Key'
  ? GetFieldTypeOfNarrowedByKey<T, X>
  : XT extends 'DotPath'
    ? GetFieldTypeOfNarrowedByDotPath<T, X>
    : X extends `${infer L}['${infer K}']${infer R}`
      ? GetFieldTypeOfNarrowedByLKR<T, L, K, R>
      : X extends `${infer L}["${infer K}"]${infer R}`
        ? GetFieldTypeOfNarrowedByLKR<T, L, K, R>
        : X extends `${infer L}[${infer K}]${infer R}`
          ? GetFieldTypeOfNarrowedByLKR<T, L, K, R>
          : GetFieldTypeOfNarrowedByDotPath<T, X>;

type GetFieldTypeOfObject<T, X, XT extends 'DotPath' | 'Key' | 'Path'> =
  Extract<T, unknown[]> extends never
    ? GetFieldTypeOfNarrowed<T, X, XT>
    : GetFieldTypeOfNarrowed<Exclude<T, unknown[]>, X, XT> | GetFieldTypeOfNarrowed<Extract<T, unknown[]>, X, XT>;

type GetFieldTypeOfPrimitive<T, X, XT extends 'DotPath' | 'Key' | 'Path'> =
  Extract<T, string> extends never
    ? T extends never
      ? never
      : undefined
    : (Exclude<T, string> extends never ? never : undefined) | GetFieldTypeOfNarrowed<Extract<T, string>, X, XT>;

export type GetFieldType<T, X, XT extends 'DotPath' | 'Key' | 'Path' = 'Path'> =
  Extract<T, object> extends never
    ? GetFieldTypeOfPrimitive<T, X, XT>
    : GetFieldTypeOfPrimitive<Exclude<T, object>, X, XT> | GetFieldTypeOfObject<Extract<T, object>, X, XT>;
