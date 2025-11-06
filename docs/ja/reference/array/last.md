# last

配列の最後の要素を返します。

```typescript
const lastElement = last(arr);
```

## 使用法

### `last(arr)`

配列の最後の要素を取得したい場合は `last` を使用してください。配列が空の場合は `undefined` を返します。配列の末尾にあるデータにアクセスする際に便利です。

```typescript
import { last } from 'es-toolkit/array';

// 数値配列の最後の要素を取得
const numbers = [1, 2, 3, 4, 5];
last(numbers);
// Returns: 5

// 文字列配列の最後の要素を取得
const strings = ['a', 'b', 'c'];
last(strings);
// Returns: 'c'

// 空の配列は undefined を返す
const emptyArray: number[] = [];
last(emptyArray);
// Returns: undefined
```

型は安全に処理されます。

```typescript
import { last } from 'es-toolkit/array';

// 空でない配列の場合、型が明確
const nonEmptyArray = [1, 2, 3] as const;
last(nonEmptyArray);
// Returns: 3 (型: 3)

// 通常の配列の場合、undefined の可能性がある
const maybeEmptyArray = [1, 2, 3];
last(maybeEmptyArray);
// Returns: 3 | undefined (型: number | undefined)
```

大きな配列でも効率的に動作します。

```typescript
import { last } from 'es-toolkit/array';

// パフォーマンスが最適化されている
const largeArray = Array(1000000)
  .fill(0)
  .map((_, i) => i);
last(largeArray);
// Returns: 999999 (高速アクセス)

// ネストされた配列も処理できる
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
last(nested);
// Returns: [5, 6]
```

#### パラメータ

- `arr` (`readonly T[]`): 最後の要素を取得する配列。

#### 戻り値

(`T | undefined`): 配列の最後の要素。配列が空の場合は `undefined` を返します。
