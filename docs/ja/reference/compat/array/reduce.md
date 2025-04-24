# reduce

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

リデューサー関数を使用して、配列またはオブジェクトを単一の値に減らします。

配列の要素またはオブジェクトの値を1つずつ繰り返し、「リデューサー」と呼ばれる特別な関数を適用します。
前のステップの結果と現在の要素を使用して計算を実行します。
すべての要素を繰り返した後、最終結果を返します。

`reduce()` 関数が開始されるとき、使用する前のステップの結果はありません。
初期値を提供すると、その値から開始します。
初期値を提供しない場合、配列の最初の要素またはオブジェクトの最初の値を使用し、2番目の要素または値から計算を開始します。

## インターフェース

```typescript
function reduce<T, U>(
  collection: T[],
  iteratee: (accumulator: U, value: T, index: number, collection: T[]) => U,
  initialValue: U
): U;
function reduce<T>(collection: T[], iteratee: (accumulator: T, value: T, index: number, collection: T[]) => T): T;

function reduce<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;
function reduce<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

function reduce<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;
function reduce<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];
```

### パラメータ

- `collection` (`T[] | ArrayLike<T> | Record<PropertyKey, T>`): 反復処理を行うコレクション。
- `iteratee` (`(accumulator: U, value: T, index, collection) => any)`): 反復ごとに呼び出される関数。
- `initialValue` (`U`): 初期値。

### 戻り値

(`any`): 蓄積された値。

## 例

```typescript
// Using a reducer function
const array = [1, 2, 3];
reduce(array, (acc, value) => acc + value, 0); // => 6

// Using a reducer function with initialValue
const array = [1, 2, 3];
reduce(array, (acc, value) => acc + value % 2 === 0, true); // => false

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
reduce(obj, (acc, value) => acc + value, 0); // => 6
```
