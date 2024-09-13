# chunk

配列を指定された長さの小さな配列に分割します。

入力として配列を受け取り、指定された長さに従って複数の小さな配列に分割します。
入力配列が均等に分割できない場合、最後の分割された配列に残りの要素が含まれます。

## インターフェース

```typescript
function chunk<T>(arr: T[], size: number): T[][];
```

### パラメータ

- `arr` (`T[]`): 小さな配列に分割する配列。
- `size` (`number`): 小さな配列の長さ。正の整数である必要があります。

### 戻り値

(`T[][]`): 最大長 `size` の小さな配列で構成される2次元配列を返します。

### エラー

`size` が正の整数でない場合、エラーをスローします。

## 例

```typescript
import { chunk } from 'es-toolkit/array';

// 数値の配列を最大長2の小さな配列に分割します。
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// 文字列の配列を最大長3の小さな配列に分割します。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

## 使用例

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash 互換性

`es-toolkit/compat` から `chunk` をインポートすると、Lodash と互換になります。

- `size` が 1 未満の場合、空の配列を返します。
- `size` に小数点のある数を提供しても、整数に切り捨てられます。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```

## 性能比較

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 238 bytes (92.4% smaller)           | 9,338,821 times (11% slower)        |
| es-toolkit/compat | 307 bytes (90.2% smaller)           | 9,892,157 times (5% slower)         |
| lodash-es         | 3,153 bytes                         | 10,523,270 times                    |
