# reduce (`Set`)

通过遍历Set的元素并应用回调函数,将Set归约为单个值。

```typescript
const result = reduce(set, callback, initialValue);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `reduce(set, callback, initialValue?)`

当您想通过累积每个元素的结果将Set转换为单个值时,请使用 `reduce`。提供一个处理每个元素并更新累加器的回调函数。如果提供了初始值,它将用作起始累加器值。如果未提供初始值且Set为空,则会抛出TypeError。

```typescript
import { reduce } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = reduce(set, (acc, value) => acc + value, 0);
// 结果: 6
```

您可以通过各种方式归约Set。

```typescript
import { reduce } from 'es-toolkit/set';

// 带初始值的求和
const numbers = new Set([10, 20, 30, 40]);

const total = reduce(numbers, (acc, num) => acc + num, 0);
// 结果: 100

// 不带初始值(使用第一个元素)
const values = new Set([5, 10]);

const sum = reduce(values, (acc, value) => acc + value);
// 结果: 15(从第一个值5开始)

// 从Set构建数组
const uniqueNames = new Set(['Alice', 'Bob', 'Charlie']);

const nameList = reduce(uniqueNames, (acc, name) => [...acc, name.toUpperCase()], [] as string[]);
// 结果: ['ALICE', 'BOB', 'CHARLIE']
```

#### 参数

- `set` (`Set<T>`): 要归约的Set。
- `callback` (`(accumulator: A, value: T, value2: T, set: Set<T>) => A`): 处理每个元素并更新累加器的函数。
- `initialValue` (`A`,可选): 累加器的初始值。如果未提供,则使用Set中的第一个元素。

#### 返回值

(`A`): 最终累积的值。

#### 抛出

(`TypeError`): 如果Set为空且未提供初始值。
