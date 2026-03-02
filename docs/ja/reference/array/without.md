# without

配列から特定の値を除外した新しい配列を作成します。

```typescript
const filtered = without(arr, ...values);
```

## 使用法

### `without(arr, ...values)`

配列から不要な特定の値を削除したい場合は `without` を使用してください。元の配列は変更されず、指定した値が削除された新しい配列が返されます。

```typescript
import { without } from 'es-toolkit/array';

// 数値配列から特定の値を削除します。
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]

// 文字列配列から特定の値を削除します。
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
```

`NaN` 値も正しく処理されます。

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### パラメータ

- `arr` (`readonly T[]`): 値を削除する配列です。
- `values` (`...T[]`): 配列から削除する値です。

#### 戻り値

(`T[]`): 指定された値が削除された新しい配列を返します。
