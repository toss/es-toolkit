# take (Lodash 互換性)

::: warning `es-toolkit`の[take](../../array/take.md)を使用してください

この`take`関数は、Lodashとの互換性のための追加処理が含まれているため遅く動作します。

代わりに、より高速で現代的な`es-toolkit`の[take](../../array/take.md)を使用してください。

:::

配列の先頭から指定された個数の要素を取得して新しい配列を作成します。

```typescript
const result = take([1, 2, 3, 4, 5], 3);
// resultは[1, 2, 3]になります。
```

## 参照

### `take(array, count)`

配列の先頭から指定された個数の要素を取得して新しい配列を返します。`count`が配列の長さより大きい場合は、配列全体を返します。

```typescript
import { take } from 'es-toolkit/compat';

// 基本的な使用法
const numbers = [1, 2, 3, 4, 5];
const result1 = take(numbers, 3);
// Returns: [1, 2, 3]

// 配列の長さより大きい個数を要求
const result2 = take(numbers, 10);
// Returns: [1, 2, 3, 4, 5] (配列全体)

// 0個を要求
const result3 = take(numbers, 0);
// Returns: []

// 空の配列を処理
const result4 = take([], 3);
// Returns: []

// 負の数を処理
const result5 = take(numbers, -1);
// Returns: []
```

#### パラメータ

- `array` (`T[]`): 要素を取得する配列です。
- `count` (`number`): 取得する要素の個数です。デフォルト値は1です。

#### 戻り値

(`T[]`): 先頭から指定された個数の要素を含む新しい配列です。
