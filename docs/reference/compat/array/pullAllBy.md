# pullAllBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Removes all specified values from an array after mapping their elements through a provided function.

You can specify the mapper function in several ways:

- **Iteratee function**: If you provide a function, it will be used to map each element before comparison. The function will be called with each element and should return a value to use for comparison.
- **Property name**: If you provide a property name (string, symbol, or number), elements will be compared based on the value of that property.
- **Partial object**: If you provide a partial object, elements will be compared based on whether they match all the properties and values in that object.
- **Property-value pair**: If you provide a tuple of [property, value], elements will be compared based on whether the specified property matches the given value.

This function changes `arr` in place.
If you want to remove values without modifying the original array, use [differenceBy](../../array/differenceBy.md).

## Signature

```typescript
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: Partial<T>): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: [keyof T, unknown]): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: keyof T): T[];
```

### Parameters

- `arr` (`T[]`): The array to modify.
- `valuesToRemove` (`ArrayLike<T>`): The values to remove from the array.
- `getValue`:
  - **Iteratee function** (`(value: T) => unknown`): If you provide a function, it will be used to map each element before comparison. The function will be called with each element and should return a value to use for comparison.
  - **Property name** (`keyof T`): If you provide a property name (string, symbol, or number), elements will be compared based on the value of that property.
  - **Partial object** (`Partial<T>`): If you provide a partial object, elements will be compared based on whether they match all the properties and values in that object.
  - **Property-value pair** (`[keyof T, unknown]`): If you provide a tuple of [property, value], elements will be compared based on whether the specified property matches the given value.

### Returns

(`T[]`): The modified array with the specified values removed.

## Examples

```typescript
// Using a iteratee function
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], obj => obj.value);
console.log(result); // [{ value: 2 }]

// Using a property name
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], 'value');
console.log(result); // [{ value: 2 }]
```
