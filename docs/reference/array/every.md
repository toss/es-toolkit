# every

Checks if all elements in a collection pass the provided predicate.

This function can handle arrays, objects, and strings. 
It returns true if all elements or characters in the collection satisfy the predicate function, or if the collection is null, undefined, empty, or has no elements.

Note: Empty arrays `[]`, empty strings `''`, and empty objects `{}` return `true` by default.

## Signature
    
```typescript
function every<T>(
collection: T[] | { [key: string]: T } | string | null | undefined,
predicate: (value: T, indexOrKey: number | string) => boolean
): boolean;
```

### Parameters

- `collection` (`T[] | { [key: string]: T } | string | null | undefined`): The collection to check, which can be an array, object, string, or `null`/`undefined`.
- `predicate` (`(value: T, indexOrKey: number | string) => boolean`): A function to test each element. It receives the current element's value and index (or key in the case of objects).

### Returns

(`boolean`): Returns `true` if all elements pass the predicate, or if the collection is empty, `null`, or `undefined`. Returns `false` if any element fails the predicate.

## Examples

```typescript
import { every } from 'es-toolkit/collection';

const numbers = [1, 2, 3];
const allPositive = every(numbers, (value) => value > 0);
console.log(allPositive); // true

const str = 'abc';
const allLowerCase = every(str, (char) => /[a-z]/.test(char));
console.log(allLowerCase); // true

const obj = { a: 1, b: 2, c: 3 };
const allGreaterThanZero = every(obj, (value) => value > 0);
console.log(allGreaterThanZero); // true
```
