# sum (`BigInt`)

返回 `BigInt` 数组中所有元素的总和。

```typescript
const total = sum(numbers);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `sum(nums)`

当您想要计算 `BigInt` 的总和时,请使用 `sum`。它将数组中的所有元素相加并返回总和。

```typescript
import { sum } from 'es-toolkit/bigint';

// 基本求和
const numbers = [1n, 2n, 3n, 4n, 5n];
const total = sum(numbers);
console.log(total); // 15n

// 负数和正数混合求和
const values = [-10n, 5n, -3n, 8n];
const result = sum(values);
console.log(result); // 0n
```

空数组返回 `0n`,所以把数组拆开分别求和,结果与整体求和始终一致。

```typescript
import { sum } from 'es-toolkit/bigint';

const empty = sum([]);
console.log(empty); // 0n

const first = [1n, 2n];
const second = [3n, 4n];
console.log(sum(first) + sum(second) === sum([...first, ...second])); // true
```

与 `number` 不同,无论数值多大 `BigInt` 都保持精确,因此非常适合表示以最小货币单位计的金额、代币数量或数据库标识符。

```typescript
import { sum } from 'es-toolkit/bigint';

// 远远超过 Number.MAX_SAFE_INTEGER,仍然精确
const balances = [9007199254740993n, 9007199254740993n];
console.log(sum(balances)); // 18014398509481986n

// 以最小货币单位存储的付款总额
const paymentsInCents = [129999n, 4550n, 87500n];
console.log(sum(paymentsInCents)); // 222049n
```

#### 参数

- `nums` (`readonly bigint[]`): 要求和的 `BigInt` 数组。

#### 返回值

(`bigint`): 返回数组中所有 `BigInt` 的总和。对于空数组返回 `0n`。
