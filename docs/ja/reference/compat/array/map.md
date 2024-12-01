# map

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供されたイテレータに基づいて変換された値の新しい配列を返します。

イテレータは次のように指定できます：

- **変換関数**：変換関数を提供すると、各要素に適用されます。
- **プロパティキー**：プロパティキーを提供すると、関数は各要素から指定されたプロパティの値を返します。
- **オブジェクト**：オブジェクトを提供すると、関数は各要素をオブジェクトと比較し、一致する場合は `true` を返します。

## シグネチャ

```typescript
function map<T, U>(collection: T[], iteratee: (value: T, index: number, collection: T[]) => U): U[];
function map<T, U>(collection: ArrayLike<T>, iteratee: (value: T, index: number, collection: ArrayLike<T>) => U): U[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: null | undefined): T[];
function map<T extends object, U>(collection: T, iteratee: (value: T[keyof T], key: string, collection: T) => U): U[];
function map<T, K extends keyof T>(collection: Record<string, T> | Record<number, T>, iteratee: K): Array<T[K]>;
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: string): any[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: object): boolean[];
```

### パラメータ

- `collection` (`T[]` | `ArrayLike<T>` | `Record<string, T>` | `Record<number, T>`): イテレーションするコレクション。

- `iteratee`:

  - **変換関数** (`(value: T, index: number, collection: T[]) => U`): 各要素を変換する関数。
  - **プロパティキー** (`K` | `string`): 各要素から抽出するプロパティのキー。
  - **オブジェクト** (`object`): 各要素と比較するオブジェクト。

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
