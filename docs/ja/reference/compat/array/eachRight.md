# eachRight (Lodash 互換性)

::: warning `es-toolkit` の `forEachRight` を使用してください

この `eachRight` 関数は、`null` や `undefined` の処理、`ArrayLike` 型の処理、様々な条件関数形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `es-toolkit` の [`forEachRight`](../../array/forEachRight.md) を使用してください。

:::

配列またはオブジェクトの各要素に対して右から左へ反復操作を実行します。

```typescript
const result = eachRight(collection, iteratee);
```

## 使用法

### `eachRight(collection, iteratee)`

配列、オブジェクト、文字列の各要素を右から左へ順回しながら与えられた関数を実行します。配列の場合は最後のインデックスから逆順に、オブジェクトの場合は列挙可能なプロパティを逆順に順回します。

```typescript
import { eachRight } from 'es-toolkit/compat';

// 配列を逆順に順回
eachRight([1, 2, 3], (value, index) => console.log(value, index));
// ログ: 3 2, 2 1, 1 0

// オブジェクトを逆順に順回
eachRight({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// ログ: 'b' 2, 'a' 1

// 文字列を逆順に順回
eachRight('hello', (char, index) => console.log(char, index));
// ログ: 'o' 4, 'l' 3, 'l' 2, 'e' 1, 'h' 0
```

関数が `false` を返すと順回を中断します。

```typescript
import { eachRight } from 'es-toolkit/compat';

eachRight([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 2で中断
});
// ログ: 4, 3, 2
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 順回するコレクションです。
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, オプション): 各要素に対して実行する関数です。デフォルトは `identity` 関数です。

#### 戻り値

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 元のコレクションを返します。
