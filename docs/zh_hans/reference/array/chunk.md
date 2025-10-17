# chunk

将数组拆分为指定大小的较小数组。

```typescript
const chunked = chunk(arr, size);
```

## 参考

### `chunk(arr, size)`

当您想将一个长数组拆分成多个大小相同的较小数组时,请使用 `chunk`。如果数组无法平均分割,最后一个块将包含剩余的元素。

```typescript
import { chunk } from 'es-toolkit/array';

// 将数字数组拆分为大小为 2 的块。
chunk([1, 2, 3, 4, 5], 2);
// 返回: [[1, 2], [3, 4], [5]]

// 将字符串数组拆分为大小为 3 的块。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// 返回: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

拆分空数组会返回空数组。

```typescript
import { chunk } from 'es-toolkit/array';

chunk([], 2); // []
```

#### 参数

- `arr` (`T[]`): 要拆分的数组。
- `size` (`number`): 每个块的大小。必须是正整数。

#### 返回值

(`T[][]`): 被拆分成大小为 `size` 的块的二维数组。

#### 抛出错误

如果 `size` 不是正整数,则抛出错误。

## 试一试

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `chunk` 时,它与 lodash 兼容。

- 如果 `size` 小于 1,则返回空数组。
- 即使为 `size` 提供了带小数的数字,也会向下舍入为整数。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // 返回 []
```

## 性能对比

|                   | [Bundle Size](../../bundle-size.md) | [Runtime Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ------------------------------------------- |
| es-toolkit        | 238 字节 (小 92.4%)                 | 9,338,821 次 (慢 11%)                       |
| es-toolkit/compat | 307 字节 (小 90.2%)                 | 9,892,157 次 (慢 5%)                        |
| lodash-es         | 3,153 字节                          | 10,523,270 次                               |
