# fill

配列の要素を指定された値で埋めます。元の配列を直接変更します。

```typescript
const filled = fill(arr, value, start, end);
```

::: info 元の配列を変更したくない場合は、[`toFilled`](./toFilled.md)を使用してください。

`toFilled`は元の配列を変更する代わりに新しい配列を返します。

:::

## 参照

### `fill(arr, value, start?, end?)`

配列の特定の範囲を指定された値で埋めたい場合は `fill` を使用してください。開始位置から終了位置の直前までの要素を提供された値で置き換えます。開始または終了位置を指定しない場合、配列全体を埋めます。

```typescript
import { fill } from 'es-toolkit/array';

// 配列全体を'a'で埋めます。
const array1 = [1, 2, 3];
fill(array1, 'a');
// Returns: ['a', 'a', 'a']

// 空の配列を2で埋めます。
const array2 = Array(3);
fill(array2, 2);
// Returns: [2, 2, 2]

// インデックス1から3の直前まで'*'で埋めます。
const array3 = [4, 6, 8, 10];
fill(array3, '*', 1, 3);
// Returns: [4, '*', '*', 10]
```

負のインデックスも使用できます。負のインデックスは配列の末尾から計算されます。

```typescript
import { fill } from 'es-toolkit/array';

const array = [1, 2, 3];
fill(array, '*', -2, -1);
// Returns: [1, '*', 3]
```

#### パラメータ

- `arr` (`Array<T | U>`): 埋める配列です。
- `value` (`U`): 配列を埋める値です。
- `start` (`number`, オプション): 開始位置です。デフォルト値は `0` です。
- `end` (`number`, オプション): 終了位置です。デフォルト値は配列の長さです。

#### 戻り値

(`Array<T | U>`): 値で埋められた元の配列を返します。
