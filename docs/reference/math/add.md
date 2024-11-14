# add

A function that adds two numbers while handling `NaN` values.

This function takes two numbers and returns their sum.

If either value is `NaN`, the function returns `NaN`.

## Signature

```typescript
function add(value: number, other: number): number;
```

### Parameters

- value (number): The first number to add.
- other (number): The second number to add.

### Returns

(number): Returns the sum of the two numbers. If either value is `NaN`, it returns `NaN`.

## Examples

```typescript
const result1 = add(2, 3); // Both values are of type number, so result1 is 5.
const result2 = add(NaN, 5); // Since value is NaN, result2 is NaN.
const result3 = add(10, NaN); // Since other is NaN, result3 is NaN.
```
