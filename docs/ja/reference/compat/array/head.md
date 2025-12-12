# head (Lodash 互換性)

::: warning `es-toolkit`の[head](../../array/head.md)を使用してください

この`head`関数は、`ArrayLike`オブジェクトの処理と配列変換プロセスにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[head](../../array/head.md)を使用してください。

:::

配列の最初の要素を返します。

```typescript
const firstElement = head(array);
```

## 使用法

### `head(array)`

配列または配列のようなオブジェクトの最初の要素を返します。配列が空または無効な場合は`undefined`を返します。

```typescript
import { head } from 'es-toolkit/compat';

// 数値配列の最初の要素
const numbers = [1, 2, 3, 4];
const first = head(numbers);
// firstは1

// 文字列配列の最初の要素
const strings = ['a', 'b', 'c'];
const firstChar = head(strings);
// firstCharは'a'

// 配列のようなオブジェクト
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const firstItem = head(arrayLike);
// firstItemは'x'
```

空の配列または無効な入力は`undefined`を返します。

```typescript
import { head } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const noElement = head(emptyArray);
// noElementはundefined

head(null); // undefined
head(undefined); // undefined
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 最初の要素を取得する配列または配列のようなオブジェクトです。

#### 戻り値

(`T | undefined`): 配列の最初の要素を返し、配列が空または無効な場合は`undefined`を返します。
