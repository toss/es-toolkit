# percentile (`BigInt`)

返回数组中位于给定百分位的 `BigInt`。

```typescript
const value = percentile(numbers, 90);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `percentile(arr, percentile)`

当您想知道数据中有给定比例的值低于哪个值时(例如 p90 延迟),请使用 `percentile`。它会对数组的副本进行排序(您的数组保持不变),并取出对应排名上的值。

```typescript
import { percentile } from 'es-toolkit/bigint';

const latencies = [1n, 2n, 3n, 4n, 5n];

console.log(percentile(latencies, 50)); // 3n
console.log(percentile(latencies, 90)); // 5n

// 数组不需要事先排序
console.log(percentile([30n, 10n, 20n], 50)); // 20n
```

它使用[最近排名法](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method),所以结果始终是数组中已有的某个值。它从不在两个值之间进行插值,因此也就不需要进行舍入。

```typescript
import { percentile } from 'es-toolkit/bigint';

// 1n 和 2n 的中点是 1.5,任何 BigInt 都无法表示,
// 因此返回的是最近排名上的值。
console.log(percentile([1n, 2n], 50)); // 1n

// 0 总是返回最小值,100 总是返回最大值
console.log(percentile([5n, 1n, 3n], 0)); // 1n
console.log(percentile([5n, 1n, 3n], 100)); // 5n
```

百分位本身是介于 `0` 和 `100` 之间的普通 `number`,而不是 `BigInt`,因为它是一个百分比,而不是被测量的数量。

```typescript
import { percentile } from 'es-toolkit/bigint';

percentile([1n, 2n, 3n], 101); // Error: Expected percentile to be <= 100 but got "101".
percentile([], 50); // RangeError: Cannot compute the percentile of an empty array.
```

#### 参数

- `arr` (`readonly bigint[]`): 要计算百分位数的 `BigInt` 数组。
- `percentile` (`number`): 要查询的百分位,介于 `0` 和 `100` 之间。

#### 返回值

(`bigint`): 返回位于给定百分位的 `BigInt`。始终是数组中已有的某个值。

#### 错误

如果 `percentile` 是 `NaN`、小于 `0` 或大于 `100`,则抛出错误。如果数组为空,则抛出 `RangeError`。
