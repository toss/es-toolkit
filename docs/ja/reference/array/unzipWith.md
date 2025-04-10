# unzipWith

結合された2次元配列を1次元配列に解き、`iteratee`関数で値を変換して新しい配列を返します。

## インターフェース

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### パラメータ

- `target` (`T[][]`): 結合を解いて変換する配列です。
- `iteratee` (`(...args: T[]) => R`): 結合が解かれた配列を変換する関数です。

### 戻り値

(`R[]`): 結合を解いて変換された値で作られた新しい配列です。

## 例

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```

## Lodashとの互換性

`es-toolkit/compat`から`unzipWith`をインポートすると、lodashと完全に互換性があります。

互換モードでは以下の機能を提供します：

- **null/undefinedの処理**: 入力配列がnullまたはundefinedの場合、空の配列を返します。
- **配列風オブジェクト**: 通常の配列の他に、配列風オブジェクト(array-like objects)も処理できます。
- **iteratee関数**: iteratee関数は再構成された要素を引数として受け取り、任意の型に変換できます。iterateeがnullまたはundefinedの場合、`unzip`のように動作し、変換せずに結合が解かれた配列を返します。

### インターフェース

```typescript
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];
function unzipWith<T, R>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee: (...args: T[]) => R): R[];
function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];
```

### 例

```typescript
// iteratee関数を使用する例
const array1 = [
  [1, 3],
  [2, 4],
];
const result1 = unzipWith(array3, (a, b) => a + b);
// result3は[3, 7]になります。iteratee関数が提供されると、再構成された要素を変換するためです。

// iterateeがnullまたはundefinedの場合
const array2 = [
  [1, 3],
  [2, 4],
];
const result2 = unzipWith(array1, null);
// result1は[[1, 2], [3, 4]]になります。iterateeがnullの場合、unzipのように動作するためです。

// 入力がnullまたはundefinedの場合
const result3 = unzipWith(null);
// result3は[]になります。入力配列がnullのためです。

// 配列風オブジェクトを使用する例
const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 };
const result4 = unzipWith(arrayLike, (a, b) => a + b);
// result4は[4, 6]になります。配列風オブジェクトも処理できるためです。
```
