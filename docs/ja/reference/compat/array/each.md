# each (Lodash 互換性)

::: warning `Array.prototype.forEach` を使用してください

この `each` 関数は、複雑な型処理と様々なコレクション型のサポートにより遅く動作します。

代わりに、より高速で現代的な `Array.prototype.forEach` を使用してください。

:::

配列またはオブジェクトの各要素に対して反復操作を実行します。

```typescript
const result = each(collection, iteratee);
```

## 参照

### `each(collection, iteratee)`

配列、オブジェクト、文字列の各要素を順回しながら与えられた関数を実行します。配列の場合はインデックス順に、オブジェクトの場合は列挙可能なプロパティを順回します。

```typescript
import { each } from 'es-toolkit/compat';

// 配列を順回
each([1, 2, 3], (value, index) => console.log(value, index));
// ログ: 1 0, 2 1, 3 2

// オブジェクトを順回
each({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// ログ: 'a' 1, 'b' 2

// 文字列を順回
each('hello', (char, index) => console.log(char, index));
// ログ: 'h' 0, 'e' 1, 'l' 2, 'l' 3, 'o' 4
```

関数が `false` を返すと順回を中断します。

```typescript
import { each } from 'es-toolkit/compat';

each([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 2で中断
});
// ログ: 1, 2
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 順回するコレクションです。
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, オプション): 各要素に対して実行する関数です。デフォルトは `identity` 関数です。

#### 戻り値

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 元のコレクションを返します。
