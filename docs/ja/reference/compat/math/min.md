# min (Lodash 互換性)

::: warning `Math.min`を使用してください

この `min` 関数は追加の関数呼び出しとnull/undefined処理により動作が遅くなります。

代わりに、より高速で現代的な `Math.min(...array)` を使用してください。

:::

配列から最小値を見つけます。

```typescript
const result = min(items);
```

## 使用法

### `min(items?)`

配列から最も小さい値を見つけたい場合は `min` を使用してください。

```typescript
import { min } from 'es-toolkit/compat';

// 数値配列から最小値
min([3, 1, 4, 1, 5, 9]);
// Returns: 1

min([10, 5, 8, 20]);
// Returns: 5

// 文字列配列から最小値（辞書順）
min(['c', 'a', 'b']);
// Returns: 'a'

min(['cherry', 'apple', 'banana']);
// Returns: 'apple'

// 空の配列やnull/undefined
min([]);
// Returns: undefined

min(null);
// Returns: undefined

min(undefined);
// Returns: undefined
```

負の数も正しく処理されます。

```typescript
import { min } from 'es-toolkit/compat';

min([0, -3, 2, 8, 7]);
// Returns: -3

min([-1, -5, -3]);
// Returns: -5
```

#### パラメータ

- `items` (`ArrayLike<T> | null | undefined`, オプション): 最小値を見つける配列です。

#### 戻り値

(`T | undefined`): 配列から最も小さい値を返します。配列が空またはnull/undefinedの場合はundefinedを返します。
