# mapKeys (`Map`)

创建一个具有相同值但键已通过提供的函数转换的新Map。

```typescript
const transformed = mapKeys(map, getNewKey);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `mapKeys(map, getNewKey)`

当您想要转换Map的键同时保持值不变时,请使用 `mapKeys`。提供一个从每个条目生成新键的函数,它返回一个具有转换后键的新Map。

```typescript
import { mapKeys } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapKeys(map, (value, key) => key.toUpperCase());
// 结果:
// Map(3) {
//   'A' => 1,
//   'B' => 2,
//   'C' => 3
// }
```

您可以通过各种方式转换键。

```typescript
import { mapKeys } from 'es-toolkit/map';

// 为键添加前缀
const categories = new Map([
  ['fruit', ['apple', 'banana']],
  ['vegetable', ['carrot', 'potato']],
]);

const prefixed = mapKeys(categories, (value, key) => `category_${key}`);
// 结果: 具有键'category_fruit'、'category_vegetable'的Map

// 根据值转换
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const ranked = mapKeys(scores, (value, key) => (value >= 90 ? `top_${key}` : key));
// 结果: 具有键'top_alice'、'bob'、'top_charlie'的Map
```

#### 参数

- `map` (`Map<K, V>`): 要转换的Map。
- `getNewKey` (`(value: V, key: K, object: Map<K, V>) => K`): 从值-键对生成新键的函数。

#### 返回值

(`Map<K, V>`): 具有转换后的键和相同值的新Map。
