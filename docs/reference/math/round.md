# round

Rounds a number to a specified precision.

This function takes a number and an optional precision value, and returns the number rounded
to the specified number of decimal places.

## Signature

```typescript
function round(value: number, precision?: number): number;
```

### Parameters

- `value` (`number`): The number to round.
- `precision` (`number`, optional): The number of decimal places to round to. Defaults to 0.

### Returns

(`number`): The rounded number.

## Examples

```typescript
const result1 = round(1.2345); // result1 will be 1
const result2 = round(1.2345, 2); // result2 will be 1.23
const result3 = round(1.2345, 3); // result3 will be 1.235
const result4 = round(1.2345, 3.1); // This will throw an error
```
