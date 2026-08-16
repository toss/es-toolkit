# isIterable

Checks if a value is iterable.

```typescript
const result = isIterable(value);
```

## Usage

### `isIterable(value)`

Use `isIterable` to check whether a value implements the iterable protocol — that is, whether it has a `Symbol.iterator` method. Arrays, strings, `Set`, `Map`, typed arrays, and generators are iterable; plain objects, `null`, and `undefined` are not.

```typescript
import { isIterable } from 'es-toolkit/predicate';

// Iterable values
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable('abc')); // true
console.log(isIterable(new Set([1, 2, 3]))); // true
console.log(isIterable(new Map())); // true

// Non-iterable values
console.log(isIterable({ a: 1 })); // false
console.log(isIterable(123)); // false
console.log(isIterable(null)); // false
```

It can also be used as a type guard in TypeScript.

```typescript
function collect(value: unknown): unknown[] {
  // Inside this branch, `value` is narrowed to `Iterable<unknown>`
  if (isIterable(value)) {
    return [...value];
  }
  return [];
}
```

#### Parameters

- `value` (`unknown`): The value to check.

#### Returns

(`value is Iterable<unknown>`): Returns `true` if the value is iterable, `false` otherwise.
