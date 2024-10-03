# get

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the value at a given path from an object. If the resolved value is `undefined`, the `defaultValue` is returned instead.

## Signature

```typescript
function get<T, K extends keyof T>(object: T, path: K | [K]): T[K];
function get<T, K extends keyof T>(object: T | null | undefined, path: K | [K]): T[K] | undefined;
function get<T, K extends keyof T, D>(
  object: T | null | undefined,
  path: K | [K],
  defaultValue: D
): Exclude<T[K], undefined> | D;

function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: [K1, K2]): T[K1][K2];
function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T | null | undefined,
  path: [K1, K2]
): T[K1][K2] | undefined;
function get<T, K1 extends keyof T, K2 extends keyof T[K1], D>(
  object: T | null | undefined,
  path: [K1, K2],
  defaultValue: D
): Exclude<T[K1][K2], undefined> | D;

function get<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T,
  path: [K1, K2, K3]
): T[K1][K2][K3];
function get<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T | null | undefined,
  path: [K1, K2, K3]
): T[K1][K2][K3] | undefined;
function get<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], D>(
  object: T | null | undefined,
  path: [K1, K2, K3],
  defaultValue: D
): Exclude<T[K1][K2][K3], undefined> | D;

function get<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(
  object: T,
  path: [K1, K2, K3, K4]
): T[K1][K2][K3][K4];
function get<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(
  object: T | null | undefined,
  path: [K1, K2, K3, K4]
): T[K1][K2][K3][K4] | undefined;
function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  D,
>(object: T | null | undefined, path: [K1, K2, K3, K4], defaultValue: D): Exclude<T[K1][K2][K3][K4], undefined> | D;

function get<T>(object: Record<number, T>, path: number): T;
function get<T>(object: Record<number, T> | null | undefined, path: number): T | undefined;
function get<T, D>(object: Record<number, T> | null | undefined, path: number, defaultValue: D): T | D;

function get<D>(object: null | undefined, path: PropertyKey, defaultValue: D): D;
function get(object: null | undefined, path: PropertyKey): undefined;

function get<T, P extends string>(data: T, path: P): string extends P ? any : Get<T, P>;
function get<T, P extends string, D = Get<T, P>>(
  data: T,
  path: P,
  defaultValue: D
): Exclude<Get<T, P>, null | undefined> | D;

function get(object: unknown, path: PropertyKey, defaultValue?: unknown): any;
function get(object: unknown, path: PropertyKey | readonly PropertyKey[], defaultValue?: unknown): any;
```

### Parameters

- `obj` (`object`): The object to query.
- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): The path of the property to get.
- `defaultValue` (`unknown`): The value returned if the resolved value is undefined.

### Returns

(`Get<T, P>`): The resolved value.

## Examples

```typescript
import { get } from 'es-toolkit/compat';

const obj = {
  a: {
    b: 4,
  },
};

get(obj, 'a.b'); // 4
get(obj, ['a', 'b']); // 4
get(obj, ['a', 'c']); // undefined
get(obj, ['a', 'c'], null); // null
```
