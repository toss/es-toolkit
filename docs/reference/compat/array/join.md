# join

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Joins elements of an array into a string.

## Signature

```typescript
function join<T>(array: T[], separator: string): string;
```

### Parameters

- `array` (`T[]`) - The array to join.
- `separator` (`string`) - The separator used to join the elements. Defaults to `,`.

### Returns

(`string`): A string containing all elements of the array joined by the specified separator.

## Examples

```typescript
const arr = ['a', 'b', 'c'];
const result = join(arr, '~');
console.log(result); // Output: "a~b~c"
```
