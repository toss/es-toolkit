# random

Generates a random floating-point number within a given range.

This function takes a minimum and maximum value, and returns a random floating-point number within that range.

# Interface

```typescript
function random(minimum: number, maximum: number): number;
```

### Parameters

- `minimum` (`number`): The lower bound for the random number (inclusive).
- `maximum` (`number`): The upper bound for the random number (exclusive).

### Returns

- (`number`): A random floating-point number within the specified range.

## Examples

```typescript
const result1 = random(0, 5); // Returns a random floating-point number between 0 and 5.
const result2 = random(5, 0); // Returns a random floating-point number between 0 and 5.
```
