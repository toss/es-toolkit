# inRange

Checks if the value is within a specified range.

## Signature

```typescript
export function inRange(value: number, maximum: number): boolean;
export function inRange(value: number, minimum: number, maximum: number): boolean;
```

### Parameters

- `value` (`number`): The value to check.
- `minimum` (`number`): The lower bound of the range (inclusive).
- `maximum` (`number`): The upper bound of the range (exclusive).

### Returns

(`boolean`): `true` if the value is within the specified range, otherwise `false`.

### Throws

Throws an error if the `minimum` is greater or equal than the `maximum`.

## Examples

```typescript
const result1 = inRange(3, 5); // result1 will be true.
const result2 = inRange(1, 2, 5); // result2 will be false.
const result3 = inRange(1, 5, 2); // If the minimum is greater or equal than the maximum, an error is thrown.
```
