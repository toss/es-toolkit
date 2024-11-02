# isPlainObject

Checks if a value is a plain object.

A plain object is a basic JavaScript object, such as `{}` or `{ name: 'John', age: 30 }`. It is not derived from a class and has either `Object.prototype` or `null` as its prototype. When you convert it to a string using the `toString` method, it will show up as `[object Object]`.

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
isPlainObject({}); // true
isPlainObject([]); // false
isPlainObject(Object.create(null)); // true

class Foo {}
isPlainObject(new Foo()); // false
isPlainObject(new Date()); // false
isPlainObject(new Set()); // false
isPlainObject(new Map()); // false
isPlainObject(Buffer.from('hello, world')); // false
isPlainObject(Math); // false
isPlainObject(JSON); // false
isPlainObject(null); // false
isPlainObject(1); // false
```

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 bytes (82.4% smaller)           | 1,505,684 times (1.70× faster)      |
| es-toolkit/compat | 435 bytes (72.5% smaller)           | 2,013,760 times (2.28× faster)      |
| lodash-es         | 1,586 bytes                         | 882,669 times                       |
