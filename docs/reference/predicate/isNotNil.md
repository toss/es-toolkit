# isNotNil

Checks if a value is neither `null` nor `undefined`.

```typescript
const result = isNotNil(value);
```

## Usage

### `isNotNil(value)`

Use `isNotNil` when you want to check if a value is neither `null` nor `undefined`. It's particularly useful for filtering out `null` or `undefined` values from arrays.

```typescript
import { isNotNil } from 'es-toolkit/predicate';

// Basic usage
console.log(isNotNil(42)); // true
console.log(isNotNil('hello')); // true
console.log(isNotNil([])); // true
console.log(isNotNil({})); // true

console.log(isNotNil(null)); // false
console.log(isNotNil(undefined)); // false

// Useful for array filtering
const mixedArray = [1, null, 'hello', undefined, true, 0];
const filteredArray = mixedArray.filter(isNotNil);
// filteredArray becomes [1, 'hello', true, 0] (null and undefined removed)
```

It can also be used as a type guard in TypeScript.

```typescript
function processItems(items: (string | null | undefined)[]) {
  // Filtering with isNotNil narrows the type to string[]
  const validItems = items.filter(isNotNil);

  validItems.forEach(item => {
    // item is now guaranteed to be of type string
    console.log(item.toUpperCase());
  });
}
```

#### Parameters

- `value` (`T | null | undefined`): The value to check if it's neither `null` nor `undefined`.

#### Returns

(`value is T`): Returns `true` if the value is neither `null` nor `undefined`, `false` otherwise.
