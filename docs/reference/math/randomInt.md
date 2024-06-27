# randomInt

Generate a random integer within the given range.

## Signature

```typescript
function randomInt(minimum: number, maximum: number): number;
```

### Parameters

- `minimum` (`number`): The lower bound for the random integer (inclusive).
- `maximum` (`number`): The upper bound for the random integer (exclusive).

### Returns

- (`number`): A random integer within the specified range.

## Examples

```typescript
const result1 = randomInt(0, 5); // Returns a random integer between 0 and 5.
const result2 = randomInt(5, 0); // If the minimum is greater than the maximum, an error is thrown
const result3 = randomInt(5, 5); // If the minimum is equal to the maximum, an error is thrown.
```
