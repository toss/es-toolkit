# fill (Lodash 互換性)

::: warning `es-toolkit` の `fill` を使用してください

この `fill` 関数は、`null` や `undefined` の処理、配列風オブジェクトのサポートなどにより複雑に動作します。

代わりに、より高速で現代的な `es-toolkit` の [`fill`](../../array/fill.md) を使用してください。

:::

配列の要素を指定された値で埋めます。

```typescript
const result = fill(array, value, start, end);
```

## 参照

### `fill(array, value, start?, end?)`

配列の特定の範囲または全体を同じ値で埋めたい場合に `fill` を使用します。元の配列を直接変更します。

```typescript
import { fill } from 'es-toolkit/compat';

// 配列全体を埋める
const arr1 = [1, 2, 3];
fill(arr1, 'a');
// 戻り値: ['a', 'a', 'a']

// 特定の範囲を埋める
const arr2 = [1, 2, 3, 4, 5];
fill(arr2, '*', 1, 4);
// 戻り値: [1, '*', '*', '*', 5]

// 負のインデックスを使用
const arr3 = [1, 2, 3, 4, 5];
fill(arr3, 'x', -3, -1);
// 戻り値: [1, 2, 'x', 'x', 5]
```

配列風オブジェクトもサポートされています。

```typescript
import { fill } from 'es-toolkit/compat';

const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
fill(arrayLike, 'a', 1, 2);
// 戻り値: { 0: 1, 1: 'a', 2: 3, length: 3 }
```

`null` または `undefined` の配列は空の配列として処理されます。

```typescript
import { fill } from 'es-toolkit/compat';

fill(null, 'a');
// 戻り値: []

fill(undefined, 'a');
// 戻り値: []
```

文字列は読み取り専用なのでそのまま返します。

```typescript
import { fill } from 'es-toolkit/compat';

fill('abc', 'x');
// 戻り値: 'abc' (変更されません)
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 埋める配列です。
- `value` (`U`): 配列を埋める値です。
- `start` (`number`, オプション): 開始位置です。デフォルトは `0` です。
- `end` (`number`, オプション): 終了位置です(含まれません)。デフォルトは `array.length` です。

#### 戻り値

(`ArrayLike<T | U>`): 値で埋められた配列を返します。
