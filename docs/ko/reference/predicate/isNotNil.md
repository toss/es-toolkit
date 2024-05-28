# isNotNil

Checks if the given value is not null nor undefined.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to ensure it is not nullable.

## Signature

```typescript
function isNotNil<T>(x: T | null | undefined): x is T;
```

### Parameters 

- `x` (`T | null | undefined`): The value to test if it is not null nor undefined.

### Returns

(`x is T`): True if the value is not null nor undefined, false otherwise.

## Examples

```typescript
// Here the type of `arr` is (number | undefined)[]
const arr = [1, undefined, 3];
// Here the type of `result` is number[]
const result = arr.filter(isNotNil);
// result will be [1, 3]
```