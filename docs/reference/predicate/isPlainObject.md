# isPlainObject

Checks if a given value is a plain object.

## Signature

```typescript
function isPlainObject(value: unknown): value is Record<PropertyKey, any>;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`value is Record<PropertyKey, any>`): True if the value is a plain object, otherwise false.

## Examples

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 bytes (82.4% smaller)           | 1,505,684 times (1.70× faster)      |
| es-toolkit/compat | 435 bytes (72.5% smaller)           | 2,013,760 times (2.28× faster)      |
| lodash-es         | 1,586 bytes                         | 882,669 times                       |
