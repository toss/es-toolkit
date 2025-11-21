# isNaN (Lodash 互換性)

::: warning `Number.isNaN`を使用してください

この `isNaN` 関数は追加の関数呼び出しにより遅く動作します。

代わりにより高速で現代的な `Number.isNaN` を使用してください。

:::

値が `NaN` かどうかを確認します。

```typescript
const result = isNaN(value);
```

## 使用法

### `isNaN(value)`

値が `NaN` かどうかを確認したい場合に `isNaN` を使用してください。

```typescript
import { isNaN } from 'es-toolkit/compat';

// NaN確認
isNaN(NaN);
// Returns: true

isNaN(Number.NaN);
// Returns: true

// その他の値
isNaN(undefined);
// Returns: false

isNaN(null);
// Returns: false

isNaN(0);
// Returns: false

isNaN('NaN');
// Returns: false
```

#### パラメータ

- `value` (`unknown`): NaNかどうかを確認する値です。

#### 戻り値

(`boolean`): 値がNaNの場合は `true`、そうでなければ `false` を返します。
