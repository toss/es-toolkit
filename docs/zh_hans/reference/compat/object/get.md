# get

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

从对象中获取给定路径的值。如果解析的值为 `undefined`，则返回 `defaultValue`。

## 签名

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

### 参数

- `obj` (`object`): 要查询的对象。
- `path` (`string` 或 `number` 或 `symbol` 或 `Array<string | number | symbol>`): 要获取属性的路径。
- `defaultValue` (`unknown`): 如果解析的值为 `undefined`，返回的值。

### 返回值

(`Get<T, P>`): 解析后的值。

## 示例

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
