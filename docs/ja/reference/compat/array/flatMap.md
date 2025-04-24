# flatMap

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

コレクションの各要素に対して iteratee 関数を実行し、結果を1段階平坦化します。iteratee は (value, index, array) の3つの引数で呼び出されます。

## インターフェース

```typescript
function flatMap<T, R>(
  collection: Array<T> | Record<string, T> | null | undefined,
  iteratee?: (
    value: T,
    index: number | string,
    collection: Array<T> | Record<string, T>
  ) => R | Array<R> | null | undefined
): Array<R>;
```

### パラメータ

- `collection`: 反復処理するコレクションです。
- `iteratee`: 各要素ごとに呼び出される関数です。デフォルトは `identity` です。

### 戻り値

(`Array`): 新しくフラット化された配列を返します。

## 例

```typescript
import { flatMap } from 'es-toolkit/compat';

// 配列を返す関数を使用した基本例
function duplicate(n) {
  return [n, n];
}

flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]

// プロパティショートハンドの使用
const objects = [{ a: [1, 2] }, { a: [3, 4] }];
flatMap(objects, 'a');
// => [1, 2, 3, 4]

// オブジェクトでの使用
flatMap({ a: 1, b: 2 }, n => [n, n]);
// => [1, 1, 2, 2]

// ネストされた配列の処理
flatMap([[1], [2, [3]], 4]);
// => [1, 2, [3], 4]
```
