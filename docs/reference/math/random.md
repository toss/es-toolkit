# random

Generate a random number within the given range. The number can be an integer or a decimal.

If only one argument is provided, a number between `0` and the given number is returned.

## Signature

```typescript
function random(maximum: number): number;
function random(minimum: number, maximum: number): number;
```

### Parameters

- `minimum` (`number`): The lower bound for the random number (inclusive).
- `maximum` (`number`): The upper bound for the random number (exclusive).

### Returns

- (`number`): A random number within the specified range. The number can be an integer or a decimal.

## Examples

```typescript
const result1 = random(0, 5); // Returns a random number between 0 and 5.
const result2 = random(5, 0); // If the minimum is greater than the maximum, an error is thrown
const result3 = random(5, 5); // If the minimum is equal to the maximum, an error is thrown.
```
