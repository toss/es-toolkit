# sumBy (`BigInt`)

返回函数从数组各元素中派生出的 `BigInt` 的总和。

```typescript
const total = sumBy(items, getValue);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `sumBy(items, getValue)`

当您想要相加的 `BigInt` 位于对象内部时,请使用 `sumBy`。传入一个从每个元素中取出该值的函数,它会把该函数返回的所有值相加。

```typescript
import { sumBy } from 'es-toolkit/bigint';

// 对每个对象的某个字段求和
const accounts = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];
const total = sumBy(accounts, account => account.balance);
console.log(total); // 60n

// 索引作为第二个参数传入
const weights = sumBy(['a', 'b', 'c'], (_, index) => BigInt(index));
console.log(weights); // 3n
```

空数组返回 `0n`,并且值可以为负数。

```typescript
import { sumBy } from 'es-toolkit/bigint';

console.log(sumBy([], () => 1n)); // 0n

const entries = [{ amount: -500n }, { amount: 1200n }, { amount: -200n }];
console.log(sumBy(entries, entry => entry.amount)); // 500n
```

#### 参数

- `items` (`readonly T[]`): 要求和的元素数组。
- `getValue` (`(element: T, index: number) => bigint`): 为每个元素返回要相加的 `BigInt` 的函数。

#### 返回值

(`bigint`): 返回 `getValue` 返回的所有值的总和。对于空数组返回 `0n`。
