# join (Lodash Compatibility)

::: warning Use `Array.prototype.join()`

This `join` function is slow due to handling ArrayLike objects, null/undefined, etc.

Use the faster and more modern `Array.prototype.join()` instead.

:::

Joins the elements of an array into a string.

## Interface

```typescript
function join<T>(array: T[], separator?: string): string;
```

### Parameters

- `array` (`T[]`) - The array to join.

::: info `array` can be `ArrayLike<T>` or `null` or `undefined`

To ensure full compatibility with lodash, the `join` function processes `array` as follows:

- If `array` is `ArrayLike<T>`, it converts it to an array using `Array.from(...)`.
- If `array` is `null` or `undefined`, it is treated as an empty array.

:::

- `separator` (`string`) - The separator used to join the elements. Defaults to `,`.

#### Returns

(`string`): A string containing all elements of the array joined by the specified separator.

## Examples

```typescript
const arr = ['a', 'b', 'c'];
const result = join(arr, '~');
console.log(result); // Output: "a~b~c"
```
