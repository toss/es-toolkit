# isMatchWith (Lodash Compatibility)

Checks if an object partially matches using a custom comparison function.

```typescript
const result = isMatchWith(target, source, customizer);
```

## Reference

### `isMatchWith(target, source, customizer)`

Use `isMatchWith` when you need custom comparison logic. You have direct control over how each property is compared.

```typescript
import { isMatchWith } from 'es-toolkit/compat';

// Case-insensitive string comparison
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // Use default behavior
};

isMatchWith({ name: 'ALICE', age: 25 }, { name: 'alice' }, caseInsensitiveCompare); // true

// Number range comparison
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true

// Array length comparison
const lengthCompare = (objVal, srcVal, key) => {
  if (key === 'items' && Array.isArray(objVal) && typeof srcVal === 'number') {
    return objVal.length === srcVal;
  }
  return undefined;
};

isMatchWith({ items: ['a', 'b', 'c'], count: 3 }, { items: 3 }, lengthCompare); // true

// Complex conditional comparison
const conditionalCompare = (objVal, srcVal, key, object, source) => {
  // Apply special logic only to specific keys
  if (key === 'status') {
    return objVal === 'active' || srcVal === 'any';
  }

  // Special handling in nested objects
  if (typeof objVal === 'object' && objVal !== null && srcVal?.special) {
    return objVal.id === srcVal.special;
  }

  return undefined; // Default behavior
};

isMatchWith({ user: { id: 123, status: 'active' } }, { user: { special: 123 }, status: 'any' }, conditionalCompare); // true
```

#### Parameters

- `target` (`unknown`): The object to check for matching.
- `source` (`unknown`): The object serving as the match pattern.
- `customizer` (`function`, optional): Function to customize comparison logic. Should return `true`, `false`, or `undefined`.

#### Returns

(`boolean`): Returns `true` if target partially matches source using custom logic, else `false`.
