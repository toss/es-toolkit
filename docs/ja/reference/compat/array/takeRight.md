# takeRight (Lodash 互換性)

::: warning `es-toolkit`の[takeRight](../../array/takeRight.md)を使用してください

この`takeRight`関数は、`null`や`undefined`の処理などにより遅く動作します。

代わりに、より高速で現代的な`es-toolkit`の[takeRight](../../array/takeRight.md)を使用してください。

:::

配列の末尾から指定された個数の要素を取得します。

```typescript
const result = takeRight(array, count);
```

## 使用法

### `takeRight(array, count)`

配列の末尾から指定された個数の要素を取得して新しい配列を作成したい場合は`takeRight`を使用してください。要求された個数が配列の長さより大きい場合は、配列全体を返します。

```typescript
import { takeRight } from 'es-toolkit/compat';

// 数値配列から末尾の2個の要素を取得します。
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 文字列配列から末尾の3個の要素を取得します。
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']

// 要求された個数が配列の長さより大きい場合
takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]

// 0個を要求
takeRight([1, 2, 3], 0);
// Returns: []

// 負の数を要求
takeRight([1, 2, 3], -1);
// Returns: []
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { takeRight } from 'es-toolkit/compat';

takeRight(null, 2); // []
takeRight(undefined, 2); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を取得する配列です。
- `count` (`number`, オプション): 取得する要素の個数です。デフォルト値は`1`です。

#### 戻り値

(`T[]`): 末尾から指定された個数の要素を含む新しい配列を返します。
