# medianBy (`BigInt`)

返回函数从数组各元素中派生出的 `BigInt` 的中间值。

```typescript
const middle = medianBy(items, getValue);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `medianBy(items, getValue)`

当您想要计算中位数的 `BigInt` 位于对象内部时,请使用 `medianBy`。传入一个从每个元素中取出该值的函数,它会计算该函数返回的所有值的中位数。

```typescript
import { medianBy } from 'es-toolkit/bigint';

const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];
const middle = medianBy(accounts, account => account.balance);
console.log(middle); // 20n
```

与 `median` 一样,当元素个数为偶数时会取中间两个值的平均值并向零截断,而空数组会抛出错误。

```typescript
import { medianBy } from 'es-toolkit/bigint';

const payments = [{ amount: 1n }, { amount: 2n }, { amount: 3n }, { amount: 4n }];
console.log(medianBy(payments, payment => payment.amount)); // 2n

medianBy([], () => 0n); // RangeError: Cannot compute the median of an empty array.
```

#### 参数

- `items` (`readonly T[]`): 要计算中位数的元素数组。
- `getValue` (`(element: T) => bigint`): 为每个元素返回所用 `BigInt` 的函数。

#### 返回值

(`bigint`): 返回 `getValue` 返回的所有值的中位数。当元素个数为偶数时,返回中间两个值的平均值,并向零截断。

#### 错误

如果数组为空,则抛出 `RangeError`。
