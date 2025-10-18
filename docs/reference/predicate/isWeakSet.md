# isWeakSet

Checks if a given value is a `WeakSet` instance.

```typescript
const result = isWeakSet(value);
```

## Reference

### `isWeakSet(value)`

Use `isWeakSet` when you want to check if a value is a WeakSet instance.

```typescript
import { isWeakSet } from 'es-toolkit/predicate';

// WeakSet instances
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet([{}, []]);

console.log(isWeakSet(weakSet1)); // true
console.log(isWeakSet(weakSet2)); // true

// Non-WeakSet values
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet(new Map())); // false
console.log(isWeakSet(new WeakMap())); // false
console.log(isWeakSet([])); // false
console.log(isWeakSet({})); // false
console.log(isWeakSet(null)); // false
console.log(isWeakSet(undefined)); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a WeakSet instance.

#### Returns

(`value is WeakSet<WeakKey>`): Returns `true` if the value is a WeakSet instance, `false` otherwise.
