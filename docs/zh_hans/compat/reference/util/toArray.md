# toArray (Lodash 兼容性)

::: warning 使用 Object.values 和 Array.from

这个 `toArray` 函数由于复杂的类型检验和多种输入处理而运行缓慢。

改为使用更快、更现代的 Object.values 或 Array.from。

:::

将值转换为数组。

```typescript
const array = toArray(value);
```

## 用法

### `toArray(value)`

将各种值转换为数组。对象转换为值的数组，类数组对象转换为数组，其他值转换为空数组。

```typescript
import { toArray } from 'es-toolkit/compat';

// 将对象转换为值的数组
toArray({ a: 1, b: 2 });
// Returns: [1, 2]

// 将字符串转换为字符数组
toArray('abc');
// Returns: ['a', 'b', 'c']

// 将 Map 转换为值的数组
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
toArray(map);
// Returns: [['a', 1], ['b', 2]]
```

null 或 undefined 转换为空数组。

```typescript
import { toArray } from 'es-toolkit/compat';

toArray(null);
// Returns: []

toArray(undefined);
// Returns: []
```

#### 参数

- `value` (`unknown`): 要转换为数组的值。

#### 返回值

(`any[]`): 返回转换后的数组。
