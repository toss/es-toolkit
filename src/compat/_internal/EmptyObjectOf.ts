type EmptyObject<T> = { [K in keyof T]?: never };
export type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never;
