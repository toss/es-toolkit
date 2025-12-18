# findValue (`Map`)

查找Map中谓词函数返回true的第一个值。

```typescript
const value = findValue(map, doesMatch);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `findValue(map, doesMatch)`

当您想查找符合特定条件的第一个条目的值时,请使用 `findValue`。提供一个测试每个条目的谓词函数,它返回第一个匹配条目的值,如果未找到则返回undefined。

```typescript
import { findValue } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findValue(map, value => value.quantity > 10);
// 结果: { color: 'purple', quantity: 15 }
```

您可以根据各种标准进行搜索。

```typescript
import { findValue } from 'es-toolkit/map';

// 按值属性查找
const products = new Map([
  ['p1', { name: 'Laptop', price: 1000, inStock: true }],
  ['p2', { name: 'Mouse', price: 25, inStock: false }],
  ['p3', { name: 'Keyboard', price: 75, inStock: true }],
]);

const expensiveProduct = findValue(products, product => product.price > 500);
// 结果: { name: 'Laptop', price: 1000, inStock: true }

// 按键模式查找
const cache = new Map([
  ['temp_1', { data: 'foo', timestamp: 100 }],
  ['perm_1', { data: 'bar', timestamp: 200 }],
  ['temp_2', { data: 'baz', timestamp: 300 }],
]);

const permanent = findValue(cache, (value, key) => key.startsWith('perm_'));
// 结果: { data: 'bar', timestamp: 200 }
```

#### 参数

- `map` (`Map<K, V>`): 要搜索的Map。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 测试每个条目的谓词函数。

#### 返回值

(`V | undefined`): 满足谓词的第一个条目的值,如果未找到则返回undefined。
