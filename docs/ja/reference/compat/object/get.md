# get

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトから指定されたパスにある値を取得します。その値が `undefined` の場合、デフォルト値を返します。

## インターフェース

```typescript
function get<T extends object, K extends keyof T>(object: T, path: K | [K]): T[K];
function get<T extends object, K extends keyof T>(object: T | null | undefined, path: K | [K]): T[K] | undefined;
function get<T extends object, K extends keyof T, D>(
  object: T | null | undefined,
  path: K | [K],
  defaultValue: D
): Exclude<T[K], undefined> | D;

function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: [K1, K2]): T[K1][K2];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T | null | undefined,
  path: [K1, K2]
): T[K1][K2] | undefined;
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], D>(
  object: T | null | undefined,
  path: [K1, K2],
  defaultValue: D
): Exclude<T[K1][K2], undefined> | D;

function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T,
  path: [K1, K2, K3]
): T[K1][K2][K3];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T | null | undefined,
  path: [K1, K2, K3]
): T[K1][K2][K3] | undefined;
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], D>(
  object: T | null | undefined,
  path: [K1, K2, K3],
  defaultValue: D
): Exclude<T[K1][K2][K3], undefined> | D;

function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4];
function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T | null | undefined, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4] | undefined;
function get<
  T extends object,
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

### パラメータ

- `obj` (`object`): 検索対象のオブジェクト。
- `path` (`string` または `number` または `symbol` または `Array<string | number | symbol>`): プロパティを取得するパス。
- `defaultValue` (`unknown`): 見つかった値が `undefined` の場合に返す値。

### 戻り値

(`Get<T, P>`): 見つかった値。

## 例

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
