# combinations

配列から長さ `r` のすべての組み合わせを返します。

```typescript
const result = combinations(arr, r);
```

## インターフェース

### `combinations(arr, r)`

順序を無視して配列から `r` 個の要素を選ぶすべての場合が必要なときに `combinations` を使用してください。結果は入力配列での位置を基準に辞書順で出力されます。

`0 <= r <= n` のとき組み合わせの数は `n! / r! / (n - r)!` で、`r > n` のときは `0` です。

```typescript
import { combinations } from 'es-toolkit/array';

// 4つの中から2つのアルファベットを選びます。
combinations(['A', 'B', 'C', 'D'], 2);
// Returns: [['A','B'], ['A','C'], ['A','D'], ['B','C'], ['B','D'], ['C','D']]

// 4つの中から3つの数字を選びます。
combinations([0, 1, 2, 3], 3);
// Returns: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
```

要素は値ではなく位置で区別されます。そのため、入力に同じ値があると、同じに見える組み合わせが複数回出力されることがあります。

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 1, 2], 2);
// Returns: [[1, 1], [1, 2], [1, 2]]
```

`r` が `0` の場合は、空の組み合わせを1つ含む配列が返されます。`r` が配列の長さより大きい場合は、空配列を返します。

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 2, 3], 0); // [[]]
combinations([1, 2], 5); // []
```

#### パラメータ

- `arr` (`readonly T[]`): 要素を選ぶ配列です。
- `r` (`number`): 各組み合わせの長さです。0以上の整数である必要があります。

#### 戻り値

(`T[][]`): 長さ `r` の組み合わせの配列を返します。

#### エラー

`r` が0以上の整数でない場合、エラーをスローします。

## 使用例

::: sandpack

```ts index.ts
import { combinations } from 'es-toolkit/array';

console.log(combinations(['A', 'B', 'C', 'D'], 2));
```

:::
