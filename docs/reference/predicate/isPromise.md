# isPromise

Checks if a given value is `Promise`.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Promise`.

## Signature

```typescript
function isPromise(value: unknown): value is Promise<any>;
```

### Parameters

- `value` (`unknown`): The value to check if it is a `Promise`.

### Returns

(`value is Promise<any>`): Returns `true` if `value` is a `Promise`, else `false`.

## Examples

```typescript
const value1 = new Promise((resolve) => resolve());
const value2 = {};
const value3 = 123;

console.log(isPromise(value1)); // true
console.log(isPromise(value2)); // false
console.log(isPromise(value3)); // false
```