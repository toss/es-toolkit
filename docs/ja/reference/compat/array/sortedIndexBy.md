# sortedIndexBy (Lodash 互換性)

::: warning バイナリ検索と変換関数を直接実装してください

この `sortedIndexBy` 関数は、複雑なiteratee処理と型変換により遅く動作します。

代わりに、より高速で現代的なバイナリ検索と変換関数を直接実装してください。

:::

ソートされた配列に変換関数を適用した後、値を挿入すべき最も低いインデックスを見つけます。

```typescript
const index = sortedIndexBy(array, value, iteratee);
```

## 参照

### `sortedIndexBy(array, value, iteratee)`

ソートされた配列に変換関数を適用した後、値の挿入位置を見つけるときに `sortedIndexBy` を使用してください。各要素と探す値に変換関数を適用して比較します。

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

// プロパティでソートされたオブジェクト配列で挿入位置を見つける
const objects = [{ x: 4 }, { x: 5 }];
sortedIndexBy(objects, { x: 4 }, 'x');
// 0を返します

// 関数を使用して変換
const numbers = [10, 20, 30];
sortedIndexBy(numbers, 25, n => n);
// 2を返します

// プロパティ-値配列で変換
const users = [{ name: 'alice' }, { name: 'bob' }];
sortedIndexBy(users, { name: 'ann' }, ['name']);
// 1を返します
```

`null` または `undefined` 配列は0を返します。

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

sortedIndexBy(null, { x: 1 }, 'x'); // 0
sortedIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 挿入する値です。
- `iteratee` (オプション): 各要素と値に適用する変換関数、プロパティ名、またはプロパティ-値配列です。

#### 戻り値

(`number`): 値を挿入すべき最も低いインデックスを返します。配列が `null` または `undefined` の場合は0を返します。
