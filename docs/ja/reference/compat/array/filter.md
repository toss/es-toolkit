# filter

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた条件を満たす要素を持つ新しい配列を返します。

条件はいくつかの方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。条件に合う要素を選択します。
- **部分オブジェクト**: 指定されたオブジェクトと部分的に一致する要素を選択します。
- **プロパティ-値ペア**: 指定されたプロパティに対してキーと値が一致する要素を選択します。
- **プロパティ名**: 指定されたプロパティ名が存在する要素を選択します。

## インターフェース

```typescript
function filter<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T[];
function filter<T>(arr: T[], doesMatch: Partial<T>): T[];
function filter<T>(arr: T[], doesMatch: [keyof T, unknown]): T[];
function filter<T>(arr: T[], doesMatch: string): T[];

function filter<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (item: T[keyof T], index: number, object: T) => unknown
): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: string): T[];
```

### パラメータ

- `arr` (`T[]`) または `object` (`T`): 繰り返し処理する配列やオブジェクト。

- `doesMatch`:

  - 配列の場合:

    - **検査関数** (`(item: T, index: number, arr: T[]) => unknown`): 各要素が条件を満たしているか確認する関数。
    - **部分オブジェクト** (`Partial<T>`): 要素の属性と値が一致するか確認する部分オブジェクト。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初の要素が対象プロパティ、2番目が対象値を示すタプル。
    - **プロパティ名** (`string`): 特定の属性を持っているか確認するプロパティ名。

  - オブジェクトの場合:

    - **検査関数** (`(item: T[keyof T], index: number, object: T) => unknown`): 各要素が条件を満たしているか確認する関数。
    - **部分値** (`Partial<T[keyof T]>`): 要素の属性と値が一致するか確認する部分オブジェクト。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初の要素が対象プロパティ、2番目が対象値を示すタプル。
    - **プロパティ名** (`string`): 特定の属性を持っているか確認するプロパティ名。

### 戻り値

(`T[]`): 条件を満たす要素の配列。該当する要素がなければ (`[]`)

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
