# initial (Lodash 互換性)

::: warning `es-toolkit`の[initial](../../array/initial.md)を使用してください

この`initial`関数は、`ArrayLike`オブジェクトの処理と配列変換プロセスにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[initial](../../array/initial.md)を使用してください。

:::

配列から最後の要素を除くすべての要素を新しい配列として返します。

```typescript
const result = initial(array);
```

## 参照

### `initial(array)`

配列または配列のようなオブジェクトから最後の要素を除くすべての要素を含む新しい配列を返します。配列が空または要素が1つだけの場合は空の配列を返します。

```typescript
import { initial } from 'es-toolkit/compat';

// 数値配列から最後の要素を除外
const numbers = [1, 2, 3, 4];
const result = initial(numbers);
// resultは[1, 2, 3]

// 文字列配列から最後の要素を除外
const strings = ['a', 'b', 'c', 'd'];
const withoutLast = initial(strings);
// withoutLastは['a', 'b', 'c']

// 配列のようなオブジェクト
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const items = initial(arrayLike);
// itemsは['x', 'y']
```

空の配列または無効な入力は空の配列を返します。

```typescript
import { initial } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const result = initial(emptyArray);
// resultは[]

const singleItem = [42];
const onlyOne = initial(singleItem);
// onlyOneは[]

initial(null); // []
initial(undefined); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 最後の要素を除外する配列または配列のようなオブジェクトです。

#### 戻り値

(`T[]`): 最後の要素を除外した新しい配列を返します。
