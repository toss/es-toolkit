# isBlob

Checks if the given value is a Blob.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Blob`.

## Signature

```typescript
function isBlob(x: unknown): x is Blob;
```

### Parameters

- `x` (`unknown`): The value to test if it is Blob.

### Returns

(`x is Blob`): True if the value is a Blob, false otherwise.

## Examples

```typescript
const value1 = new Blob();
const value2 = {};
const value3 = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(value1)); // true
console.log(isBlob(value2)); // false
console.log(isBlob(value3)); // true
```
