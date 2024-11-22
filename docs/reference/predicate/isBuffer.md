# isBuffer

Checks if the given value is a Buffer instance.

This function tests whether the provided value is an instance of Buffer.
It returns `true` if the value is a Buffer, and `false` otherwise.

## Signature

```typescript
function isBuffer(x: unknown): boolean;
```

### Parameters

- `x` (`unknown`): The value to check if it is a Buffer.

### Returns

(`boolean`): Returns `true` if `x` is a Buffer, else `false`.

## Examples

```typescript
const buffer = Buffer.from('test');
console.log(isBuffer(buffer)); // true

const notBuffer = 'not a buffer';
console.log(isBuffer(notBuffer)); // false
```
