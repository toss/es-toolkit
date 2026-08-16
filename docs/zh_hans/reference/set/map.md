# map (`Set`)

创建一个具有通过提供的函数转换的元素的新Set。

```typescript
const transformed = map(set, getNewValue);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `map(set, getNewValue)`

当您想要转换Set的元素时,请使用 `map`。提供一个从每个元素生成新值的函数,它返回一个具有转换后元素的新Set。

```typescript
import { map } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = map(set, value => value * 2);
// 结果: Set(3) { 2, 4, 6 }
```

您可以通过各种方式转换元素。

```typescript
import { map } from 'es-toolkit/set';

// 转换字符串
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased = map(names, name => name.toUpperCase());
// 结果: Set(3) { 'ALICE', 'BOB', 'CHARLIE' }

// 转换对象
const prices = new Set([10, 20, 30]);

const products = map(prices, price => ({ price, currency: 'USD' }));
// 结果: 包含对象{ price: 10, currency: 'USD' }等的Set

// 提取属性
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

const ids = map(users, user => user.id);
// 结果: Set(2) { 1, 2 }
```

#### 参数

- `set` (`Set<T>`): 要转换的Set。
- `getNewValue` (`(value: T, value2: T, set: Set<T>) => U`): 从元素生成新值的函数。

#### 返回值

(`Set<U>`): 具有转换后元素的新Set。
