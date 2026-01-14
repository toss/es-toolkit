# fromPairs

将键值对数组转换为对象。

```typescript
const object = fromPairs(pairs);
```

## 用法

### `fromPairs(pairs)`

当您想将键值对数组转换为单个对象时，请使用 `fromPairs`。每个对应该是一个包含两个元素的数组：第一个元素成为键，第二个元素成为值。

此函数是 `Object.entries` 或将对象转换为键值对数组的类似函数的逆函数。

```typescript
import { fromPairs } from 'es-toolkit/array';

// 将键值对转换为对象
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 返回: { a: 1, b: 2, c: 3 }

// 适用于不同的键类型
const symbolKey = Symbol('key');
const mixedPairs = [
  ['stringKey', 'value1'],
  [42, 'value2'],
  [symbolKey, 'value3'],
];
const mixedResult = fromPairs(mixedPairs);
// 返回: { stringKey: 'value1', 42: 'value2', [symbolKey]: 'value3' }
```

如果存在重复的键，则使用最后一个值。

```typescript
import { fromPairs } from 'es-toolkit/array';

const duplicatePairs = [
  ['a', 1],
  ['b', 2],
  ['a', 3],
];
const result = fromPairs(duplicatePairs);
// 返回: { a: 3, b: 2 }
```

#### 参数

- `pairs` (`ReadonlyArray<readonly [K, V]>`): 要转换为对象的键值对数组。

#### 返回值

(`Record<K, V>`): 返回从键值对创建的新对象。
