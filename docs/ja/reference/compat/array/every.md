# every

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列やオブジェクトのすべての要素が指定された条件を満たすかどうかを確認します。

条件は複数の方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。すべての要素が `true` を返す場合、結果は `true` になります。
- **部分オブジェクト**: 与えられたオブジェクトとすべてのプロパティが一致する場合にのみ `true` を返します。
- **プロパティ-値ペア**: 該当プロパティに対してすべての要素が値が一致する場合に `true` を返します。
- **プロパティ名**: 該当プロパティに対してすべての要素が真と評価される値を持つ場合に `true` を返します。

## インターフェース

```typescript
function every<T>(arr: T[]): boolean;
function every<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): boolean;
function every<T>(arr: T[], doesMatch: Partial<T>): boolean;
function every<T>(arr: T[], doesMatch: [keyof T, unknown]): boolean;
function every<T>(arr: T[], doesMatch: string): boolean;

function every<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: string): boolean;
```

### パラメータ

- `arr` (`T[]`) または `object` (`T`): 検索する配列またはオブジェクト。

- `doesMatch`:

  - 配列の場合:

    - **検査関数** (`(item: T, index: number, arr: T[]) => unknown`): 条件を満たすかどうかを確認する関数。すべての要素が条件を満たす場合、結果は `true` になります。
    - **部分オブジェクト** (`Partial<T>`): 与えられた部分オブジェクトのプロパティと値に一致する場合、すべての要素が条件を満たす必要があります。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。すべての要素がこの条件を満たす場合、結果は `true` になります。
    - **プロパティ名** (`string`): 指定されたプロパティがすべての要素に対して真と評価される場合、結果は `true` になります。

  - オブジェクトの場合:
    - **検査関数** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): 条件を満たすかどうかを確認する関数。すべての要素が条件を満たす場合、結果は `true` になります。
    - **部分値** (`Partial<T[keyof T]>`): 与えられた部分値に一致する場合、すべての要素が条件を満たす必要があります。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。すべての要素がこの条件を満たす場合、結果は `true` になります。
    - **プロパティ名** (`string`): 指定されたプロパティがすべての要素に対して真と評価される場合、結果は `true` になります。

### 戻り値

(`boolean`): 与えられた条件を満たすすべての要素がある場合は `true`、そうでない場合は `false` を返します。

## 例

### 配列の場合

```typescript
import { every } from 'es-toolkit/compat';

// 検査関数を使う場合
const items = [1, 2, 3, 4, 5];
const result = every(items, item => item > 0);
console.log(result); // true

// 部分オブジェクトを使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, { name: 'Bob' });
console.log(result); // false

// プロパティ-値ペアを使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, ['name', 'Alice']);
console.log(result); // false

// プロパティ名を使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, 'name');
console.log(result); // true
```

### オブジェクトの場合

```typescript
import { every } from 'es-toolkit/compat';

// 検査関数を使う場合
const obj = { a: 1, b: 2, c: 3 };
const result = every(obj, value => value > 0);
console.log(result); // true

// 部分オブジェクトを使う場合
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, { name: 'Bob' });
console.log(result); // false

// プロパティ-値ペアを使う場合
const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = every(obj, ['name', 'Alice']);
console.log(result); // false

// プロパティ名を使う場合
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, 'name');
console.log(result); // true
```
