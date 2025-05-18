# flatMapDepth

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列またはオブジェクトの各要素に対して反復関数を適用し、結果を指定された深さまでフラット化します。

## インターフェース

```typescript
function flatMapDepth<T>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | null
    | undefined
): T[];

function flatMapDepth<T, R>(
  array: ArrayLike<T> | null | undefined,
  iteratee: (value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth<T extends object, R>(
  collection: T,
  iteratee: (value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth(collection: object | null | undefined, path: string, depth?: number): any[];

function flatMapDepth(collection: object | null | undefined, matches: object, depth?: number): boolean[];
```

### パラメータ

- `collection` (`Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | null | undefined`): 反復処理する配列またはオブジェクト。
- `iteratee`: 各要素ごとに呼び出される関数。デフォルトは `identity`。
  - `(value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R`: 各要素に対して呼び出される関数。
  - `(value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R`: 各プロパティに対して呼び出される関数。
  - `string`: 抽出するプロパティのパス。
  - `object`: 照合するオブジェクト。
- `depth` (`number`): 最大再帰深度。デフォルトは `1`。

### 戻り値

- (`T[] | R[] | any[] | boolean[]`): 新しいフラット化された配列を返します。

## 例

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 配列を返す関数を使った基本例
function duplicate(n) {
  return [n, n];
}

flatMapDepth([1, 2], duplicate);
// => [1, 1, 2, 2]

// 深さを指定する
flatMapDepth(
  [
    [
      [1, 2],
      [3, 4],
    ],
  ],
  n => [n, n],
  2
);
// => [1, 1, 2, 2, 3, 3, 4, 4]

// マッチングオブジェクトを使用する
flatMapDepth({ a: 1, b: 2 }, { a: 1 });
// => [true, false]

// プロパティパスを使用する
flatMapDepth({ a: { a: 1, b: 2 } }, 'a');
// => [1, 2]
```
