# isWeakMap

检查给定值是否为 `WeakMap` 实例。

```typescript
const result = isWeakMap(value);
```

## 用法

### `isWeakMap(value)`

当您想检查值是否为 `WeakMap` 实例时,请使用 `isWeakMap`。`WeakMap` 是一个以对象作为键的键值存储,使用弱引用,有助于防止内存泄漏。

```typescript
import { isWeakMap } from 'es-toolkit/predicate';

// WeakMap 实例
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, 'value']]);

console.log(isWeakMap(weakMap1)); // true
console.log(isWeakMap(weakMap2)); // true

// 非 WeakMap 值
console.log(isWeakMap(new Map())); // false
console.log(isWeakMap(new Set())); // false
console.log(isWeakMap(new WeakSet())); // false
console.log(isWeakMap({})); // false
console.log(isWeakMap([])); // false
console.log(isWeakMap(null)); // false
console.log(isWeakMap(undefined)); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 WeakMap 实例的值。

#### 返回值

(`boolean`): 如果值是 WeakMap 实例,则返回 `true`,否则返回 `false`。
