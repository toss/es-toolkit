# intersection (Lodash 互換性)

::: warning `es-toolkit`の[intersection](../../array/intersection.md)を使用してください

この`intersection`関数は、`null`や`undefined`の処理、複数配列のサポート、重複除去プロセスにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[intersection](../../array/intersection.md)を使用してください。

:::

複数の配列の共通部分を求めます。

```typescript
const result = intersection(...arrays);
```

## 参照

### `intersection(...arrays)`

複数の配列で共通に存在する要素を見つけて新しい配列として返します。結果は重複が除去され、最初の配列の順序を維持します。

```typescript
import { intersection } from 'es-toolkit/compat';

// 2つの配列の共通部分
const array1 = [1, 2, 3, 4];
const array2 = [2, 3, 5, 6];
const result = intersection(array1, array2);
// resultは[2, 3]

// 3つの配列の共通部分
const array3 = [3, 4, 7, 8];
const multiResult = intersection(array1, array2, array3);
// multiResultは[3]

// 文字列配列
const strings1 = ['a', 'b', 'c'];
const strings2 = ['b', 'c', 'd'];
const stringResult = intersection(strings1, strings2);
// stringResultは['b', 'c']

// 配列のようなオブジェクト
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, 2: 4, length: 3 };
const likeResult = intersection(arrayLike1, arrayLike2);
// likeResultは[2, 3]
```

`null`または`undefined`配列は空の配列として扱われます。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3];
const result1 = intersection(array1, null);
// result1は[]

const result2 = intersection(null, undefined);
// result2は[]
```

重複した要素は結果から除去されます。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 1, 2, 3];
const array2 = [1, 2, 2, 4];
const result = intersection(array1, array2);
// resultは[1, 2]（重複除去されます）
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 共通部分を求める配列です。配列のようなオブジェクトやnull/undefinedも許可されます。

#### 戻り値

(`T[]`): すべての配列で共通に存在する要素の新しい配列を返します。重複は除去され、最初の配列の順序に従います。
