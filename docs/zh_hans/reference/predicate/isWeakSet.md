# isWeakSet

检查给定值是否为 `WeakSet` 实例。

```typescript
const result = isWeakSet(value);
```

## 用法

### `isWeakSet(value)`

当您想检查值是否为 WeakSet 实例时,请使用 `isWeakSet`。

```typescript
import { isWeakSet } from 'es-toolkit/predicate';

// WeakSet 实例
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet([{}, []]);

console.log(isWeakSet(weakSet1)); // true
console.log(isWeakSet(weakSet2)); // true

// 非 WeakSet 值
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet(new Map())); // false
console.log(isWeakSet(new WeakMap())); // false
console.log(isWeakSet([])); // false
console.log(isWeakSet({})); // false
console.log(isWeakSet(null)); // false
console.log(isWeakSet(undefined)); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 WeakSet 实例的值。

#### 返回值

(`value is WeakSet<WeakKey>`): 如果值是 WeakSet 实例,则返回 `true`,否则返回 `false`。
