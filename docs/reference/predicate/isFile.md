# isFile

Checks if the given value is a `File`.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `File`.

## Signature

```typescript
function isFile(x: unknown): x is File;
```

### Parameters

- `x` (`unknown`): The value to test if it is a `File`.

### Returns

(`x is File`): True if the value is a `File`, false otherwise.

## Examples

```typescript
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
const blob = new Blob(['content'], { type: 'text/plain' });
const value = {};

console.log(isFile(file)); // true
console.log(isFile(blob)); // false
console.log(isFile(value)); // false
```
