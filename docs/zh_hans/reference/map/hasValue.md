# hasValue (`Map`)

检查Map是否包含特定值。

```typescript
const exists = hasValue(map, searchElement);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `hasValue(map, searchElement)`

当您想检查Map是否包含特定值时,请使用 `hasValue`。此函数使用SameValueZero比较(类似于Array.prototype.includes),这意味着NaN被认为等于NaN。

```typescript
import { hasValue } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = hasValue(map, 2);
// 结果: true

const result2 = hasValue(map, 5);
// 结果: false
```

您可以搜索各种值类型。

```typescript
import { hasValue } from 'es-toolkit/map';

// 搜索NaN(使用SameValueZero比较)
const numbers = new Map([
  ['a', 1],
  ['b', NaN],
  ['c', 3],
]);

const hasNaN = hasValue(numbers, NaN);
// 结果: true

// 搜索对象(引用相等性)
const obj = { id: 1 };
const objects = new Map([
  ['first', obj],
  ['second', { id: 2 }],
]);

const hasObj = hasValue(objects, obj);
// 结果: true

const hasSimilar = hasValue(objects, { id: 1 });
// 结果: false(不同的引用)
```

#### 参数

- `map` (`Map<K, V>`): 要搜索的Map。
- `searchElement` (`V`): 要搜索的值。

#### 返回值

(`boolean`): 如果Map包含该值则返回true,否则返回false。
