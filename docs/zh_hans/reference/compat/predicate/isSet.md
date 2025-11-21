# isSet (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [isSet](../../predicate/isSet.md)
这个 `isSet` 函数是 Lodash 兼容性的函数，但与主库具有相同的实现。

请使用更快且现代的 `es-toolkit` 的 [isSet](../../predicate/isSet.md)。
:::

检查值是否为 Set。

```typescript
const result = isSet(value);
```

## 用法

### `isSet(value)`

当您想类型安全地检查值是否为 Set 时使用 `isSet`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isSet } from 'es-toolkit/compat';

// Set 检查
const set = new Set();
isSet(set); // true

// 其他类型返回 false
isSet(new Map()); // false
isSet(new WeakSet()); // false
isSet([]); // false
isSet({}); // false
isSet('set'); // false
isSet(123); // false
isSet(null); // false
isSet(undefined); // false
```

也与其他类似 Set 的集合进行区分。

```typescript
import { isSet } from 'es-toolkit/compat';

// Set vs Map vs WeakSet
isSet(new Set([1, 2, 3])); // true
isSet(new Map([['key', 'value']])); // false
isSet(new WeakSet()); // false

// Set vs 数组
isSet(new Set([1, 2, 3])); // true
isSet([1, 2, 3]); // false

// Set vs 普通对象
isSet(new Set()); // true
isSet({}); // false
isSet(Object.create(null)); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 Set 的值。

#### 返回值

(`value is Set<any>`): 如果值为 Set 则返回 `true`，否则返回 `false`。
