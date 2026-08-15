# filter (`Set`)

根据谓词函数过滤Set。

```typescript
const filtered = filter(set, callback);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `filter(set, callback)`

当您想创建一个仅包含满足特定条件的元素的新Set时,请使用 `filter`。提供一个测试每个元素的谓词函数,它返回一个仅包含谓词返回true的元素的新Set。

```typescript
import { filter } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = filter(set, value => value > 2);
// 结果: Set(3) { 3, 4, 5 }
```

您可以根据各种标准进行过滤。

```typescript
import { filter } from 'es-toolkit/set';

// 按值类型过滤
const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const evenNumbers = filter(numbers, num => num % 2 === 0);
// 结果: Set(5) { 2, 4, 6, 8, 10 }

// 过滤对象
const products = new Set([
  { name: 'Laptop', price: 1000, available: true },
  { name: 'Mouse', price: 25, available: false },
  { name: 'Keyboard', price: 75, available: true },
]);

const availableProducts = filter(products, product => product.available);
// 结果: 包含Laptop和Keyboard的Set
```

#### 参数

- `set` (`Set<T>`): 要过滤的Set。
- `callback` (`(value: T, value2: T, set: Set<T>) => boolean`): 测试每个元素的谓词函数。

#### 返回值

(`Set<T>`): 仅包含满足谓词的元素的新Set。
