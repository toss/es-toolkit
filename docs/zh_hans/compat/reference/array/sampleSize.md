# sampleSize（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 [sampleSize](../../array/sampleSize.md)

此 `sampleSize` 函数由于 `null` 或 `undefined` 处理、对象支持、默认值处理等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [sampleSize](../../array/sampleSize.md)。

:::

从数组或对象中随机选择指定数量的元素。

```typescript
const sampled = sampleSize(collection, size);
```

## 用法

### `sampleSize(collection, size?)`

当需要从数组或对象中随机选择元素时，使用 `sampleSize`。它使用 Floyd 算法进行高效的无重复采样。

```typescript
import { sampleSize } from 'es-toolkit/compat';

// 从数组中随机选择3个元素。
sampleSize([1, 2, 3, 4, 5], 3);
// 返回值：[2, 4, 5]（实际结果可能不同）

// 从对象中随机选择2个值。
sampleSize({ a: 1, b: 2, c: 3, d: 4 }, 2);
// 返回值：[2, 4]（实际结果可能不同）
```

`null` 或 `undefined` 作为空数组处理。

```typescript
import { sampleSize } from 'es-toolkit/compat';

sampleSize(null, 2);
// 返回值：[]

sampleSize(undefined, 2);
// 返回值：[]
```

#### 参数

- `collection` (`Record<string, T> | Record<number, T> | T | null | undefined`)：要采样的数组或对象。
- `size` (`number`，可选）：要选择的元素数量。默认值为 `1`。

#### 返回值

(`T[]`)：返回由随机选择的元素组成的新数组。
