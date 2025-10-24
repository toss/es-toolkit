# xor (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [xor](../../array/xor.md)

此 `xor` 函数由于处理 `null` 或 `undefined`、复杂的重复计算逻辑等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [xor](../../array/xor.md)。

:::

创建一个由恰好存在于多个数组中的一个数组中的元素组成的新数组。

```typescript
const result = xor(...arrays);
```

## 参考

### `xor(...arrays)`

计算多个数组的对称差集。换句话说,返回恰好存在于给定数组中的一个数组中的元素。这在比较两个或多个数组时查找不重叠的唯一元素时很有用。

```typescript
import { xor } from 'es-toolkit/compat';

// 两个数组的对称差集
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// 返回: [1, 2, 5, 6]

// 三个数组的对称差集
xor([1, 2], [2, 3], [4, 5]);
// 返回: [1, 3, 4, 5]

// 字符串数组
xor(['a', 'b'], ['b', 'c']);
// 返回: ['a', 'c']

// 仅提供一个数组
xor([1, 2, 3]);
// 返回: [1, 2, 3]
```

`null`、`undefined` 或空数组被忽略,只处理有效数组。

```typescript
import { xor } from 'es-toolkit/compat';

xor([1, 2], null, [2, 3]);
// 返回: [1, 3]

xor([], [1, 2], [2, 3]);
// 返回: [1, 3]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要计算对称差集的数组。`null` 或 `undefined` 被忽略。

#### 返回值

(`T[]`): 返回一个由恰好存在于数组中的一个数组中的元素组成的新数组。
