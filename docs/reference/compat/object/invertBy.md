# invertBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new object that reverses the keys and values of the given object, similar to the [invert](../../object/invert.md) function.

The `iteratee` function specifies how the values are reversed into keys. If no `iteratee` function is provided, the values are used as keys as-is.

The values of the new object are arrays of keys that correspond to the value returned by the `iteratee` function.

## Signature

```typescript
function invertBy<K extends PropertyKey, V>(object: Record<K, V>, iteratee?: (value: V) => string): Record<string, K[]>;
```

### Parameters

- `object` (`Record<K, V>`): The object to iterate over.
- `iteratee` (`(value: V) => string`): A function applied to each value to generate a key. If not provided, defaults to a function that converts the value to a string.

### Returns

- `(Record<string, K[]>)`: An object where each key is the result of the iteratee, and the corresponding value is an array of property names from the input object that produced that value.

### Examples

```typescript
import { invertBy } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj);
console.log(result); // => { '1': ['a', 'c'], '2': ['b'] }

const customResult = invertBy(obj, value => `group${value}`);
console.log(customResult); // => { 'group1': ['a', 'c'], 'group2': ['b'] }
```
