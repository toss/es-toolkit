# pullAt (Lodash 互換性)

::: warning `es-toolkit` の [pullAt](../../array/pullAt.md) を使用してください

この `pullAt` 関数は、複雑な型処理とオーバーロードにより動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [pullAt](../../array/pullAt.md) を使用してください。

:::

指定されたインデックスにある要素を配列から削除し、削除された要素を返します。

```typescript
const removed = pullAt(array, ...indexes);
```

## 参照

### `pullAt(array, ...indexes)`

指定されたインデックスにある要素を配列から削除し、削除された要素の配列を返します。元の配列は変更されます。

```typescript
import { pullAt } from 'es-toolkit/compat';

// 個別のインデックスで削除
const array = [1, 2, 3, 4, 5];
const removed = pullAt(array, 1, 3);
console.log(array); // [1, 3, 5]
console.log(removed); // [2, 4]

// インデックスの配列で削除
const colors = ['red', 'green', 'blue', 'yellow'];
const removedColors = pullAt(colors, [0, 2]);
console.log(colors); // ['green', 'yellow']
console.log(removedColors); // ['red', 'blue']
```

存在しないインデックスは `undefined` として扱われます。

```typescript
import { pullAt } from 'es-toolkit/compat';

const numbers = [10, 20, 30];
const removed = pullAt(numbers, 1, 5);
console.log(numbers); // [10, 30]
console.log(removed); // [20, undefined]
```

#### パラメータ

- `array` (`ArrayLike<T>`): 変更する配列です。
- `...indexes` (`Array<number | number[]>`): 削除する要素のインデックスです。個別の数値または数値の配列として渡すことができます。

#### 戻り値

(`ArrayLike<T>`): 削除された要素の配列を返します。
