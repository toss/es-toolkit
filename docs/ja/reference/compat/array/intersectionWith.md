# intersectionWith (Lodash 互換性)

::: warning `es-toolkit`の[intersectionWith](../../array/intersectionWith.md)を使用してください

この`intersectionWith`関数は、`null`や`undefined`の処理、さまざまなオーバーロードのサポートなどにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[intersectionWith](../../array/intersectionWith.md)を使用してください。

:::

カスタム比較関数を使用して、すべての配列に含まれる共通要素の配列を作成します。

```typescript
const result = intersectionWith(array, ...otherArrays, comparator);
```

## 参照

### `intersectionWith(array, ...otherArrays, comparator)`

カスタム比較関数を使用して、最初の配列と残りの配列の共通部分を求めます。比較関数で各要素が等しいかを判断し、すべての配列に含まれる要素のみを返します。

```typescript
import { intersectionWith } from 'es-toolkit/compat';

const objects = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const others = [
  { id: 1, name: 'john' },
  { id: 3, name: 'joe' },
];

intersectionWith(objects, others, (a, b) => a.id === b.id);
// => [{ id: 1, name: 'john' }]

// 複数の配列と比較することもできます
const array1 = [{ x: 1 }, { x: 2 }];
const array2 = [{ x: 1 }, { x: 3 }];
const array3 = [{ x: 1 }, { x: 4 }];

intersectionWith(array1, array2, array3, (a, b) => a.x === b.x);
// => [{ x: 1 }]
```

`null`または`undefined`は空の配列として扱われます。

```typescript
import { intersectionWith } from 'es-toolkit/compat';

intersectionWith(null, [1, 2], (a, b) => a === b); // []
intersectionWith([1, 2], undefined, (a, b) => a === b); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 比較する最初の配列です。
- `...otherArrays` (`Array<ArrayLike<U> | ((a: T, b: T | U) => boolean)>`): 比較する他の配列と、最後の要素として比較関数です。
- `comparator` (`(a: T, b: T | U) => boolean`): 2つの要素が等しいかを判断する関数です。

#### 戻り値

(`T[]`): すべての配列で共通に見つかった要素の新しい配列を返します。
