# last (Lodash互換性)

::: warning `es-toolkit`の[last](../../array/last.md)を使用してください

この`last`関数は`null`や`undefined`の処理により複雑に動作します。

代わりに、より高速でモダンな`es-toolkit`の[last](../../array/last.md)を使用してください。

:::

配列の最後の要素を返します。

```typescript
const lastElement = last(array);
```

## 参照

### `last(array)`

配列の最後の要素を取得したいときに`last`を使用してください。配列が空の場合は`undefined`を返します。

```typescript
import { last } from 'es-toolkit/compat';

// 数値配列の最後の要素
last([1, 2, 3, 4, 5]);
// Returns: 5

// 文字列配列の最後の要素
last(['a', 'b', 'c']);
// Returns: 'c'

// オブジェクト配列の最後の要素
const users = [{ name: 'Alice' }, { name: 'Bob' }];
last(users);
// Returns: { name: 'Bob' }
```

空の配列や`null`、`undefined`は`undefined`を返します。

```typescript
import { last } from 'es-toolkit/compat';

// 空の配列
last([]);
// Returns: undefined

// null配列
last(null);
// Returns: undefined

// undefined配列
last(undefined);
// Returns: undefined
```

配列風オブジェクトもサポートしています。

```typescript
import { last } from 'es-toolkit/compat';

// 配列風オブジェクト
const arrayLike = { 0: 'first', 1: 'second', length: 2 };
last(arrayLike);
// Returns: 'second'

// 文字列も配列風オブジェクト
last('hello');
// Returns: 'o'
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 最後の要素を取得する配列です。

#### 戻り値

(`T | undefined`): 配列の最後の要素を返し、配列が空または`null`、`undefined`の場合は`undefined`を返します。
