# mean (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [mean](../../math/mean.md)

这个 `mean` 函数由于类型转换和 null/undefined 处理会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [mean](../../math/mean.md)。

:::

计算数组的平均值。

```typescript
const average = mean(array);
```

## 参考

### `mean(array)`

计算数字数组的平均值。

```typescript
import { mean } from 'es-toolkit/compat';

// 数字数组
mean([1, 2, 3, 4, 5]);
// Returns: 3

mean([10, 20, 30]);
// Returns: 20

mean([1.5, 2.5, 3.5]);
// Returns: 2.5
```

空数组返回 NaN。

```typescript
import { mean } from 'es-toolkit/compat';

mean([]);
// Returns: NaN

mean(null);
// Returns: NaN

mean(undefined);
// Returns: NaN
```

无效值会被忽略并计算。

```typescript
import { mean } from 'es-toolkit/compat';

mean([1, undefined, 2, null, 3]);
// Returns: 2 (1 + 2 + 3) / 3 = 2
```

字符串数字也能处理。

```typescript
import { mean } from 'es-toolkit/compat';

mean(['1', '2', '3']);
// Returns: 2 (字符串转换为数字)
```

#### 参数

- `array` (`ArrayLike<any> | null | undefined`): 包含要计算平均值的数字数组。

#### 返回值

(`number`): 返回数组的平均值。如果是空数组则返回 `NaN`。
