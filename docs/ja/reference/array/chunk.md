# chunk

配列を指定されたサイズの小さな配列に分割し、新しい2次元配列を返します。

```typescript
const chunked = chunk(arr, size);
```

## インターフェース

### `chunk(arr, size)`

長い配列を同じサイズの複数の小さな配列に分割したい場合は `chunk` を使用してください。配列を均等に分割できない場合、最後の配列に残りの要素が含まれます。

```typescript
import { chunk } from 'es-toolkit/array';

// 数値配列をサイズ2に分割します。
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// 文字列配列をサイズ3に分割します。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

空の配列を分割すると空の配列が返されます。

```typescript
import { chunk } from 'es-toolkit/array';

chunk([], 2); // []
```

#### パラメータ

- `arr` (`T[]`): 分割する配列です。
- `size` (`number`): 各小さな配列のサイズです。正の整数である必要があります。

#### 戻り値

(`T[][]`): サイズ `size` に分割された2次元配列を返します。

#### エラー

`size` が正の整数でない場合、エラーをスローします。

## 使用例

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```
