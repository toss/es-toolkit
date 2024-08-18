# join

This function concatenates all elements of an array into a single string using a specified separator.

## Signature

```typescript
function join<T>(array: readonly T[], separator: string): string;
```

### Parameters

- `array` (`T[]`): The array containing the elements to be joined.
- `separator` (`string`): The string to be inserted between elements.

### Returns

(`string`) A string that concatenates all the elements of the array using the separator. If the array is empty, it returns an empty string.

## Examples

```typescript
const fruits = ['Apple', 'Banana', 'Cherry'];
const result = join(fruits, ',');
// result will be 'Apple,Banana,Cherry'

const numbers = [1, 2, 3];
const formattedNumbers = join(numbers, ' - ');
// formattedNumbers will be '1 - 2 - 3'

const emptyArray = [];
const emptyResult = join(emptyArray, ',');
// emptyResult will be ''
```
