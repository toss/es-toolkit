# cloneWith (Lodash compatibility)

::: warning Implementing custom logic is recommended

This `cloneWith` function is relatively slow due to complex customizer function processing.

Instead, use `clone` and implement custom logic directly.

:::

Creates a shallow copy of an object using a customizer function.

```typescript
const cloned = cloneWith(value, customizer);
```

## Reference

### `cloneWith(value, customizer?)`

Use `cloneWith` when you want to customize how copying works. The customizer function controls how specific values are copied.

```typescript
import { cloneWith } from 'es-toolkit/compat';

// Basic usage (without customizer)
const obj = { a: 1, b: 'hello' };
const cloned = cloneWith(obj);
// Returns: { a: 1, b: 'hello' } (new object instance)

// Transforming number values
const obj2 = { a: 1, b: 2, c: 'text' };
const cloned2 = cloneWith(obj2, value => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // Returning undefined uses default copy behavior
});
// Returns: { a: 2, b: 4, c: 'text' }

// Transforming array elements
const arr = [1, 2, 3];
const clonedArr = cloneWith(arr, value => {
  if (typeof value === 'number') {
    return value + 10;
  }
});
// Returns: [11, 12, 13]

// Handling specific types
const complex = {
  date: new Date('2023-01-01'),
  number: 42,
  text: 'hello',
};
const clonedComplex = cloneWith(complex, value => {
  if (value instanceof Date) {
    // Convert Date to ISO string
    return value.toISOString();
  }
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  // Use default copy for other types
});
// Returns: { date: '2023-01-01T00:00:00.000Z', number: 42, text: 'HELLO' }
```

If the customizer returns `undefined`, the default copy behavior is used.

```typescript
import { cloneWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
const cloned = cloneWith(obj, value => {
  // Return undefined for all values = use default copy
  return undefined;
});
// Returns: { a: 1, b: { c: 2 } } (same result as clone)
```

#### Parameters

- `value` (`T`): The value to clone.
- `customizer` (`function`, optional): A function that determines how to copy. In the form `(value: any) => any`.

#### Returns

(`T`): Returns the shallow copy processed by the customizer.
