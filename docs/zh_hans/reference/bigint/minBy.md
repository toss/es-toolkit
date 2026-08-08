# minBy (`BigInt`)

返回数组中派生出的 `BigInt` 值最小的元素。

```typescript
const smallest = minBy(items, getValue);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `minBy(items, getValue)`

当您要比较的 `BigInt` 位于对象内部,并且想拿回整个对象而不仅仅是数字时,请使用 `minBy`。传入一个从每个元素中取出该值的函数。

```typescript
import { minBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const poorest = minBy(accounts, account => account.balance);
console.log(poorest); // { owner: 'alice', balance: 10n }
```

当多个元素的最小值相同时,返回第一个。`getValue` 还会接收索引和整个数组。

```typescript
import { minBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 10n };
const second = { id: 'b', score: 10n };
console.log(minBy([first, second], item => item.score)); // { id: 'a', score: 10n }
```

空数组没有可返回的元素,所以会抛出错误。

```typescript
import { minBy } from 'es-toolkit/bigint';

minBy([], () => 0n); // RangeError: Cannot find the minimum of an empty array.
```

#### 参数

- `items` (`readonly T[]`): 要搜索的元素数组。
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): 返回用于比较的 `BigInt` 的函数。

#### 返回值

(`T`): 返回派生出的 `BigInt` 最小的元素。如果有多个元素并列,则返回其中的第一个。

#### 错误

如果数组为空,则抛出 `RangeError`。
