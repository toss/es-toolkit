# isError

Check if the given value is an Error object.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to Error.

## Signature

```typescript
function isError(value: unknown): value is Error;
```

### Parameters

- `value`(`unknown`): The value to test if it is an Error object.

### Returns

(`value is Error`): True if the value is an Error object, otherwise false.

## Examples

```typescript
isError(new Error()); // true
isError('error'); // false
isError({ name: 'Error', message: '' }); // false
```
