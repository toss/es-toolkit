# add

A function that adds two numbers while handling `invalid or NaN values`.

This function takes two numeric values and returns their sum.

If either of the two values is `invalid or NaN`, it returns `NaN`.

## Signature

```typescript
function add(value: number, other: number): number;
```

### Parameters

- value (number): The first number to add.
- other (number): The second number to add.

### Returns

(number): Returns the sum of the two numbers. If either value is `NaN` or invalid, it returns `NaN`.

## Examples

```typescript
const result1 = add(2, 3); // Both values are of type number, so result1 is 5.
const result2 = add(5, 'a'); // other is not of type number, so result2 is NaN.
const result3 = add(NaN, 10); // value is NaN, so result3 is NaN.
const result4 = add(2, NaN); // other is NaN, so result4 is NaN.
```
