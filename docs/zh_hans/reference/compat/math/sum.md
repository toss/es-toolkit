# sum (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [sum](../../math/sum.md)

这个 `sum` 函数由于类型转换和 null/undefined 处理会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [sum](../../math/sum.md)。

:::

将数组的所有值相加。

```typescript
const total = sum(array);
```

## 参考

### `sum(array)`

将数组中的所有数字相加得到总和。

```typescript
import { sum } from 'es-toolkit/compat';

// 数字数组
sum([1, 2, 3]);
// Returns: 6

sum([1.5, 2.5, 3]);
// Returns: 7

// 空数组
sum([]);
// Returns: 0
```

BigInt 和字符串也能处理。

```typescript
import { sum } from 'es-toolkit/compat';

// BigInt 数组
sum([1n, 2n, 3n]);
// Returns: 6n

// 字符串数组（连接）
sum(['1', '2']);
// Returns: '12'
```

无效值会被忽略。

```typescript
import { sum } from 'es-toolkit/compat';

sum([1, undefined, 2]);
// Returns: 3 (忽略 undefined)

sum(null);
// Returns: 0

sum(undefined);
// Returns: 0
```

#### 参数

- `array` (`ArrayLike<any> | null | undefined`): 包含要相加值的数组。

#### 返回值

(`number`): 返回所有值相加的总和。
