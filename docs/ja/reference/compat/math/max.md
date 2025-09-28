# max (Lodash 互換性)

::: warning `Math.max`を使用してください

この `max` 関数は追加の関数呼び出しと `null`/`undefined` 処理により動作が遅くなります。

代わりに、より高速で現代的な `Math.max(...array)` を使用してください。

:::

配列から最大値を見つけます。

```typescript
const result = max(items);
```

## 参照

### `max(items?)`

配列から最も大きい値を見つけたい場合は `max` を使用してください。

```typescript
import { max } from 'es-toolkit/compat';

// 数値配列から最大値
max([1, 2, 3]);
// Returns: 3

max([10, 5, 8, 20]);
// Returns: 20

// 文字列配列から最大値（辞書順）
max(['a', 'b', 'c']);
// Returns: 'c'

max(['apple', 'banana', 'cherry']);
// Returns: 'cherry'

// 空の配列やnull/undefined
max([]);
// Returns: undefined

max(null);
// Returns: undefined

max(undefined);
// Returns: undefined
```

負の数も正しく処理されます。

```typescript
import { max } from 'es-toolkit/compat';

max([-1, -5, -3]);
// Returns: -1

max([0, -2, 5, -10]);
// Returns: 5
```

#### パラメータ

- `items` (`ArrayLike<T> | null | undefined`, オプション): 最大値を見つける配列です。

#### 戻り値

(`T | undefined`): 配列から最も大きい値を返します。配列が空またはnull/undefinedの場合はundefinedを返します。
