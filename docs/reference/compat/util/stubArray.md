# stubArray (Lodash Compatibility)

::: warning Use `[]` directly instead

This `stubArray` function is a simple wrapper that returns an empty array and represents unnecessary abstraction.

Use the faster and more direct `[]` instead.

:::

Always returns a new empty array.

```typescript
const emptyArray = stubArray();
```

## Usage

### `stubArray()`

A function that always returns a new empty array. Use this when you need an empty array as a default value or when you need consistent return values in functional programming.

```typescript
import { stubArray } from 'es-toolkit/compat';

// Returns an empty array
const emptyArray = stubArray();
console.log(emptyArray); // => []

// Use as default value in array methods
const items = [1, 2, 3];
const result = items.filter(x => x > 5) || stubArray();
console.log(result); // => []

// Use in functional programming
const getData = () => stubArray();
const data = getData();
data.push('item'); // Safe because it's a new array
```

Returns a new array instance each time.

```typescript
import { stubArray } from 'es-toolkit/compat';

const arr1 = stubArray();
const arr2 = stubArray();

console.log(arr1 === arr2); // => false (different instances)
console.log(Array.isArray(arr1)); // => true
console.log(arr1.length); // => 0
```

#### Parameters

None.

#### Returns

(`any[]`): Returns a new empty array.
