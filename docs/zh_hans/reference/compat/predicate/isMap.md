# isMap (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isMap](../../predicate/isMap.md)

这个 `isMap` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isMap](../../predicate/isMap.md)。

:::

检查值是否为 Map。

```typescript
const result = isMap(value);
```

## 用法

### `isMap(value)`

当需要类型安全地检查值是否为 Map 时使用 `isMap`。在 TypeScript 中它也可以作为类型守卫使用。

```typescript
import { isMap } from 'es-toolkit/compat';

// 检查 Map
const map = new Map();
isMap(map); // true

// 其他类型返回 false
isMap(new Set()); // false
isMap(new WeakMap()); // false
isMap({}); // false
isMap([]); // false
isMap('map'); // false
isMap(123); // false
isMap(null); // false
isMap(undefined); // false
```

它也可以区分 Map 和其他类似的集合。

```typescript
import { isMap } from 'es-toolkit/compat';

// Map vs Set vs WeakMap
isMap(new Map([['key', 'value']])); // true
isMap(new Set(['value'])); // false
isMap(new WeakMap()); // false

// Map vs 普通对象
isMap({}); // false
isMap({ key: 'value' }); // false
isMap(Object.create(null)); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 Map 的值。

#### 返回值

(`boolean`): 如果值是 Map 则返回 `true`，否则返回 `false`。
