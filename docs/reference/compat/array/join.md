# join (Lodash Compatibility)

::: warning Use `Array.prototype.join()`

This `join` function is slow due to handling ArrayLike objects, null/undefined, etc.

Use the faster and more modern `Array.prototype.join()` instead.

:::

Joins the elements of an array into a string.

```typescript
const result = join(array, separator);
```

## Reference

### `join(array, separator?)`

Use `join` to combine all elements of an array into a single string. It connects each element with a separator.

```typescript
import { join } from 'es-toolkit/compat';

// Join string array
const arr = ['a', 'b', 'c'];
join(arr, '~'); // => "a~b~c"

// Join number array
const numbers = [1, 2, 3];
join(numbers, '-'); // => "1-2-3"
```

If you omit the separator, comma (`,`) is used by default.

```typescript
import { join } from 'es-toolkit/compat';

join(['a', 'b', 'c']); // => "a,b,c"
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { join } from 'es-toolkit/compat';

join(null, '-'); // => ""
join(undefined, '-'); // => ""
```

#### Parameters

- `array` (`T[]`) - The array to join.

::: info `array` can be `ArrayLike<T>` or `null` or `undefined`

To ensure full compatibility with lodash, the `join` function processes `array` as follows:

- If `array` is `ArrayLike<T>`, it converts it to an array using `Array.from(...)`.
- If `array` is `null` or `undefined`, it is treated as an empty array.

:::

- `separator` (`string`, optional) - The separator used to join the elements. Defaults to `,`.

#### Returns

(`string`): Returns a string containing all elements of the array joined by the specified separator.
