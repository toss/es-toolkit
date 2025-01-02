# map

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::
配列の各要素を変換して新しい配列を返します。

各要素を変換する方法は [iteratee](../util/iteratee.md) 関数の動作に従って指定できます。

- **変換関数**: 各要素に対して指定された関数を実行し、その結果に変換します。
- **プロパティ名**: 各要素から指定されたプロパティ名を選択します。
- **プロパティ-値ペア**: 各要素のプロパティが指定された値と一致するかどうかを真偽値で返します。
- **部分オブジェクト**: 各要素が部分オブジェクトのプロパティと値に一致するかどうかを真偽値で返します。

## インターフェース

```typescript
function map<T, U>(arr: T[], iteratee: (value: T, index: number, arr: T[]) => U): U[];
function map<T>(arr: T[], iteratee: Partial<T>): boolean[];
function map<T>(arr: T[], iteratee: [keyof T, unknown]): boolean[];
function map<T, K extends keyof T>(arr: T[], iteratee: K): Array<T[K]>;
function map<T>(arr: T[], iteratee?: null | undefined): T[];

function map<T extends object, U>(object: T, iteratee: (value: T[keyof T], key: string, object: T) => U): U[];
function map<T>(object: T, iteratee: Partial<T[keyof T]>): boolean[];
function map<T>(object: T, iteratee: [keyof T[keyof T], unknown]): boolean[];
function map<T, K extends keyof T[keyof T]>(object: T, iteratee: K): Array<T[keyof T][K]>;
function map<T extends object, U>(object: T, iteratee?: null | undefined): U[];
```

### パラメータ

- `arr` (`T[]`) または `object` (`T`): 変換する配列またはオブジェクト。

::: info `arr` は `ArrayLike<T>` であるか、`null` または `undefined` である可能性があります

lodash と完全に互換性があるように、`map` 関数は `arr` を次のように処理します:

- `arr` が `ArrayLike<T>` の場合、`Array.from(...)` を使用して配列に変換します。
- `arr` が `null` または `undefined` の場合、空の配列と見なされます。

:::

::: info `object` は `null` または `undefined` である可能性があります

lodash と完全に互換性があるように、`map` 関数は `object` を次のように処理します:

- `object` が `null` または `undefined` の場合、空のオブジェクトに変換されます。

:::

- `iteratee`:

  - 配列の場合:

    - **変換関数** (`(value: T, index: number, arr: T[]) => U`): 配列の各要素を変換する関数。
    - **プロパティ名** (`keyof T`): 各要素から選択するプロパティ名。
    - **プロパティ-値ペア** (`[keyof T, unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。
    - **部分オブジェクト** (`Partial<T>`): 一致させるプロパティと値を指定した部分オブジェクト。

  - オブジェクトの場合:

    - **変換関数** (`(item: T[keyof T], index: number, object: T) => unknown`): オブジェクトの各値を変換する関数。
    - **プロパティ名** (`keyof T[keyof T]`): オブジェクトの各値から選択するプロパティ名。
    - **プロパティ-値ペア** (`[keyof T[keyof T], unknown]`): 最初が一致させるプロパティ、2番目が一致させる値を表すタプル。
    - **部分オブジェクト** (`Partial<T[keyof T]>`): 一致させるプロパティと値を指定した部分オブジェクト。

### 戻り値

(`any[]`): 変換された値の新しい配列。

## 使用例

```typescript
// 変換関数使用
const array = [1, 2, 3];
map(array, value => value * 2); // => [2, 4, 6]

// イテレータでプロパティキーを使用
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, 'a'); // => [1, 2, 3]

// イテレータでオブジェクトを使用
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, { a: 1 }); // => [true, false, false]

// イテレータなし
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// オブジェクトでコレクションを使用
const obj = { a: 1, b: 2, c: 3 };
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
