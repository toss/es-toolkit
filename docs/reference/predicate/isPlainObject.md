# isPlainObject

Checks if a given value is a plain object.

## Signature

```typescript
function isPlainObject(object: object): boolean;
```

### Parameters

- `object` (`object`): The value to check.

### Returns

(`boolean`): True if the value is a plain object, otherwise false.

## Examples

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```
