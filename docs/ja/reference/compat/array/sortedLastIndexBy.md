# sortedLastIndexBy (Lodash 互換性)

::: warning バイナリ検索と変換関数を直接実装してください

この `sortedLastIndexBy` 関数は、複雑なiteratee処理と型変換により遅く動作します。

代わりに、より高速で現代的なバイナリ検索と変換関数を直接実装してください。

:::

ソートされた配列に変換関数を適用した後、値を挿入すべき最も高いインデックスを見つけます。

```typescript
const index = sortedLastIndexBy(array, value, iteratee);
```

## 参照

### `sortedLastIndexBy(array, value, iteratee)`

ソートされた配列に変換関数を適用した後、値の最も高い挿入位置を見つけるときに `sortedLastIndexBy` を使用してください。重複した値がある場合、最後の値の後のインデックスを返します。

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

// プロパティでソートされたオブジェクト配列で最後の挿入位置を見つける
const objects = [{ x: 4 }, { x: 5 }, { x: 5 }];
sortedLastIndexBy(objects, { x: 5 }, 'x');
// 3を返します（最後のx: 5の後の位置）

// 関数を使用して変換
const numbers = [10, 20, 20, 30];
sortedLastIndexBy(numbers, 20, n => n);
// 3を返します
```

`null` または `undefined` 配列は0を返します。

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

sortedLastIndexBy(null, { x: 1 }, 'x'); // 0
sortedLastIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 挿入する値です。
- `iteratee` (オプション): 各要素と値に適用する変換関数、プロパティ名、またはプロパティ-値配列です。

#### 戻り値

(`number`): 値を挿入すべき最も高いインデックスを返します。配列が `null` または `undefined` の場合は0を返します。
