# find

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列やオブジェクトから条件に合う最初の値を見つけます。

条件は複数の方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。最初に `true` を返す値が選択されます。
- **部分オブジェクト**: 与えられたオブジェクトと部分的に一致する最初の要素が選択されます。
- **プロパティ-値ペア**: 該当プロパティに対して値が一致する最初の要素が選択されます。
- **プロパティ名**: 該当プロパティに対して真と評価される値を持つ最初の要素が選択されます。

## インターフェース

```typescript
function find<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T | undefined;
function find<T>(arr: T[], doesMatch: Partial<T>): T | undefined;
function find<T>(arr: T[], doesMatch: [keyof T, unknown]): T | undefined;
function find<T>(arr: T[], doesMatch: string): T | undefined;

function find<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (item: T[keyof T], index: number, object: T) => unknown
): T | undefined;
function find<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T | undefined;
function find<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): T | undefined;
function find<T extends Record<string, unknown>>(object: T, doesMatch: string): T | undefined;
```

### パラメータ

- `arr` (`T[]`) または `object` (`T`): 検索する配列またはオブジェクト。

- `doesMatch`:

  - 配列の場合:

    - **検査関数** (`(item: T, index: number, arr: T[]) => unknown`): 探している要素かどうかを返す関数。
    - **部分オブジェクト** (`Partial<T>`): 一致させるプロパティと値を指定した部分オブジェクト。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。
    - **プロパティ名** (`string`): 真と評価される値を持っているか確認するプロパティ名。

  - オブジェクトの場合:
    - **検査関数** (`(item: T[keyof T], index: number, object: T) => unknown`): 探している要素かどうかを返す関数。
    - **部分値** (`Partial<T[keyof T]>`): 一致させるプロパティと値を指定した部分オブジェクト。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。
    - **プロパティ名** (`string`): 真と評価される値を持っているか確認するプロパティ名。

### 戻り値

(`T | undefined`): 与えられた条件を満たす最初の要素。ない場合は `undefined`。

## 例

### 配列の場合

```typescript
import { find } from 'es-toolkit/compat';

// 検査関数を使う場合
const items = [1, 2, 3, 4, 5];
const result = find(items, item => item > 3);
console.log(result); // 4

// 部分オブジェクトを使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// プロパティ-値ペアを使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// プロパティ名を使う場合
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, 'name');
console.log(result); // { id: 1, name: 'Alice' }
```

### オブジェクトの場合

```typescript
import { find } from 'es-toolkit/compat';

// 検査関数を使う場合
const obj = { a: 1, b: 2, c: 3 };
const result = find(obj, item => item > 2);
console.log(result); // 3

// 部分オブジェクトを使う場合
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = find(obj, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// プロパティ-値ペアを使う場合
const items = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = find(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// プロパティ名を使う場合
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = find(obj, 'name');
console.log(result); // { id: 1, name: 'Alice' }
```
