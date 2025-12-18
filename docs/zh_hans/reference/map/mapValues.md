# mapValues (`Map`)

创建一个具有相同键但值已通过提供的函数转换的新Map。

```typescript
const transformed = mapValues(map, getNewValue);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `mapValues(map, getNewValue)`

当您想要转换Map的值同时保持键不变时,请使用 `mapValues`。提供一个从每个条目生成新值的函数,它返回一个具有转换后值的新Map。

```typescript
import { mapValues } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapValues(map, value => value * 2);
// 结果:
// Map(3) {
//   'a' => 2,
//   'b' => 4,
//   'c' => 6
// }
```

您可以通过各种方式转换值。

```typescript
import { mapValues } from 'es-toolkit/map';

// 格式化值
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

const formatted = mapValues(prices, value => `$${value.toFixed(2)}`);
// 结果: 具有值'$1.50'、'$0.75'、'$2.00'的Map

// 根据键转换
const inventory = new Map([
  ['premium_item', 10],
  ['standard_item', 20],
  ['basic_item', 30],
]);

const adjusted = mapValues(inventory, (value, key) => (key.startsWith('premium_') ? value * 1.5 : value));
// 结果: 具有值15、20、30的Map
```

#### 参数

- `map` (`Map<K, V>`): 要转换的Map。
- `getNewValue` (`(value: V, key: K, object: Map<K, V>) => V`): 从值-键对生成新值的函数。

#### 返回值

(`Map<K, V>`): 具有相同键和转换后值的新Map。
