# reduce (`Map`)

通过遍历Map的条目并应用回调函数,将Map归约为单个值。

```typescript
const result = reduce(map, callback, initialValue);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `reduce(map, callback, initialValue?)`

当您想通过累积每个条目的结果将Map转换为单个值时,请使用 `reduce`。提供一个处理每个条目并更新累加器的回调函数。如果提供了初始值,它将用作起始累加器值。如果未提供初始值且Map为空,则会抛出TypeError。

```typescript
import { reduce } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = reduce(map, (acc, value) => acc + value, 0);
// 结果: 6
```

您可以通过各种方式归约Map。

```typescript
import { reduce } from 'es-toolkit/map';

// 带初始值的求和
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const totalScore = reduce(scores, (acc, score) => acc + score, 0);
// 结果: 274

// 不带初始值(使用第一个值)
const numbers = new Map([
  ['a', 10],
  ['b', 20],
]);

const sum = reduce(numbers, (acc, value) => acc + value);
// 结果: 30(从第一个值10开始)

// 从Map构建对象
const settings = new Map([
  ['theme', 'dark'],
  ['lang', 'en'],
  ['notifications', true],
]);

const config = reduce(
  settings,
  (acc, value, key) => ({ ...acc, [key]: value }),
  {} as Record<string, any>
);
// 结果: { theme: 'dark', lang: 'en', notifications: true }
```

#### 参数

- `map` (`Map<K, V>`): 要归约的Map。
- `callback` (`(accumulator: A, value: V, key: K, map: Map<K, V>) => A`): 处理每个条目并更新累加器的函数。
- `initialValue` (`A`,可选): 累加器的初始值。如果未提供,则使用Map中的第一个值。

#### 返回值

(`A`): 最终累积的值。

#### 抛出

(`TypeError`): 如果Map为空且未提供初始值。
