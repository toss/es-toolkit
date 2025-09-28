# mean (Lodash 互換性)

::: warning es-toolkitの[mean](../../math/mean.md)を使用してください

この `mean` 関数は型変換とnull/undefined処理により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [mean](../../math/mean.md) を使用してください。

:::

配列の平均値を計算します。

```typescript
const average = mean(array);
```

## 参照

### `mean(array)`

数値配列の平均値を計算します。

```typescript
import { mean } from 'es-toolkit/compat';

// 数値配列
mean([1, 2, 3, 4, 5]);
// Returns: 3

mean([10, 20, 30]);
// Returns: 20

mean([1.5, 2.5, 3.5]);
// Returns: 2.5
```

空の配列はNaNを返します。

```typescript
import { mean } from 'es-toolkit/compat';

mean([]);
// Returns: NaN

mean(null);
// Returns: NaN

mean(undefined);
// Returns: NaN
```

不正な値は無視して計算されます。

```typescript
import { mean } from 'es-toolkit/compat';

mean([1, undefined, 2, null, 3]);
// Returns: 2 (1 + 2 + 3) / 3 = 2
```

文字列数値も処理されます。

```typescript
import { mean } from 'es-toolkit/compat';

mean(['1', '2', '3']);
// Returns: 2 (文字列が数値に変換される)
```

#### パラメータ

- `array` (`ArrayLike<any> | null | undefined`): 平均を計算する数値が含まれる配列です。

#### 戻り値

(`number`): 配列の平均値を返します。空の配列の場合は `NaN` を返します。
