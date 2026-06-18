# every (`Map`)

测试Map中的所有条目是否满足提供的谓词函数。

```typescript
const allMatch = every(map, doesMatch);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `every(map, doesMatch)`

当您想检查Map中的所有条目是否满足特定条件时,请使用 `every`。提供一个测试每个条目的谓词函数,如果所有条目都满足谓词,它返回true,否则返回false。

```typescript
import { every } from 'es-toolkit/map';

const map = new Map([
  ['a', 10],
  ['b', 20],
  ['c', 30],
]);

const result = every(map, value => value > 5);
// 结果: true

const result2 = every(map, value => value > 15);
// 结果: false
```

您可以测试各种条件。

```typescript
import { every } from 'es-toolkit/map';

// 检查所有值是否满足条件
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 8, inStock: true }],
]);

const allInStock = every(inventory, item => item.inStock);
// 结果: true

// 检查所有键是否匹配模式
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['api.host', 'localhost'],
]);

const allApiSettings = every(settings, (value, key) => key.startsWith('api.'));
// 结果: true
```

#### 参数

- `map` (`Map<K, V>`): 要测试的Map。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 测试每个条目的谓词函数。

#### 返回值

(`boolean`): 如果所有条目都满足谓词则返回true,否则返回false。
