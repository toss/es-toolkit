# median (`BigInt`)

返回 `BigInt` 数组的中间值。

```typescript
const middle = median(numbers);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `median(nums)`

当您想要一组 `BigInt` 的中间值时,请使用 `median`。它会对数组的副本进行排序(您的数组保持不变),并返回位于中间的值。

```typescript
import { median } from 'es-toolkit/bigint';

const middle = median([1n, 2n, 3n, 4n, 5n]);
console.log(middle); // 3n

// 数组不需要事先排序
console.log(median([5n, 1n, 4n, 2n, 3n])); // 3n
```

当数组的元素个数为偶数时,会取中间两个值的平均值。`BigInt` 没有小数部分,所以该平均值会**向零截断**。

```typescript
import { median } from 'es-toolkit/bigint';

// (2n + 3n) / 2n 是 2n,而不是 2.5
console.log(median([1n, 2n, 3n, 4n])); // 2n

// (1n + 2n) / 2n 是 1n
console.log(median([1n, 2n])); // 1n

// 截断是向零进行的,所以结果是 -2n 而不是 -3n
console.log(median([-3n, -2n])); // -2n
```

没有任何 `BigInt` 可以表示“没有中位数”,因为 `BigInt` 没有 `NaN`,所以空数组会抛出错误,而不是返回一个占位值。

```typescript
import { median } from 'es-toolkit/bigint';

median([]); // RangeError: Cannot compute the median of an empty array.
```

#### 参数

- `nums` (`readonly bigint[]`): 要计算中位数的 `BigInt` 数组。

#### 返回值

(`bigint`): 返回数组的中位数。当元素个数为偶数时,返回中间两个值的平均值,并向零截断。

#### 错误

如果数组为空,则抛出 `RangeError`。
