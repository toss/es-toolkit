# matchesProperty

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that checks if a given source object matches a specific property value.

The returned function takes a source object and determines if the property at the
specified path within the source object is equal to the given value.

## Signature

```typescript
function matchesProperty(property: PropertyKey | PropertyKey[], source: unknown): (target?: unknown) => boolean;
```

### Parameters

- `property` (`number | string | symbol | Array<number | string | symbol>`): The property path to check within the target object. This can be a single property key, an array of property keys, or a string representing a deep path.
- `source` (`unknown`): The value to compare against the property value in the target object.

### Returns

(`(target: unknown) => boolean`): A function that takes a target object and returns `true` if the property value at the given path in the target object matches the provided value, otherwise returns `false`.

## Examples

```typescript
// Using a single property key
const checkName = matchesProperty('name', 'Alice');
console.log(checkName({ name: 'Alice' })); // true
console.log(checkName({ name: 'Bob' })); // false

// Using an array of property keys
const checkNested = matchesProperty(['address', 'city'], 'New York');
console.log(checkNested({ address: { city: 'New York' } })); // true
console.log(checkNested({ address: { city: 'Los Angeles' } })); // false

// Using a deep path
const checkNested = matchesProperty('address.city', 'New York');
console.log(checkNested({ address: { city: 'New York' } })); // true
console.log(checkNested({ address: { city: 'Los Angeles' } })); // false
```
