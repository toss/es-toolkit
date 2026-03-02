# eq (Lodash Compatibility)

Checks if two values are equivalent using SameValueZero comparison.

```typescript
const isEqual = eq(value, other);
```

## Usage

### `eq(value, other)`

Use `eq` when you want to check if two values are equivalent. Unlike regular `===` comparison, it returns `true` when comparing `NaN` with `NaN`.

```typescript
import { eq } from 'es-toolkit/compat';

// Basic usage
console.log(eq(1, 1)); // true
console.log(eq(0, -0)); // true (SameValueZero considers 0 and -0 equal)
console.log(eq(NaN, NaN)); // true
console.log(eq('a', 'a')); // true
console.log(eq('a', 'b')); // false
```

Behaves differently from `Object.is()`.

```typescript
// Using eq
console.log(eq(NaN, NaN)); // true
console.log(eq(0, -0)); // true

// Using Object.is (faster)
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false (Object.is considers 0 and -0 different)

// Using ===
console.log(NaN === NaN); // false
console.log(0 === -0); // true
```

#### Parameters

- `value` (`any`): The first value to compare.
- `other` (`any`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the values are equivalent, `false` otherwise.
