# isMatchWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Performs a deep comparison between a target value and a source pattern to determine if they match, using a custom comparison function for fine-grained control over the matching logic.

This function recursively traverses both values, calling the custom compare function for each property/element pair. If the compare function returns a boolean, that result is used directly. If it returns undefined, the default matching behavior continues recursively.

The matching behavior varies by data type:

- **Objects**: Matches if all properties in the source exist in the target and match
- **Arrays**: Matches if all elements in the source array can be found in the target array (order-independent)
- **Maps**: Matches if all key-value pairs in the source Map exist and match in the target Map
- **Sets**: Matches if all elements in the source Set can be found in the target Set
- **Functions**: Matches using strict equality, or object comparison if the function has properties
- **Primitives**: Matches using strict equality

Special cases:

- Empty objects, arrays, Maps, and Sets always match any target
- Circular references are handled using an internal stack to prevent infinite recursion

## Signature

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  compare?: (objValue: any, srcValue: any, key: PropertyKey, object: any, source: any, stack?: Map<any, any>) => unknown
): boolean;
```

### Parameters

- `target` (`unknown`): The value to be tested for matching
- `source` (`unknown`): The pattern/template to match against
- `compare` (`function`, optional): Optional custom comparison function that receives:
  - `objValue`: The value from the target at the current path
  - `srcValue`: The value from the source at the current path
  - `key`: The property key or array index being compared
  - `object`: The parent object/array from the target
  - `source`: The parent object/array from the source
  - `stack`: Internal Map used for circular reference detection
    Should return `true` for a match, `false` for no match, or `undefined` to continue with default behavior

### Returns

(`boolean`): `true` if the target matches the source pattern, `false` otherwise

## Examples

### Basic matching without custom comparator

```typescript
// Basic matching without custom comparator
isMatchWith({ a: 1, b: 2 }, { a: 1 }); // true
isMatchWith([1, 2, 3], [1, 3]); // true
```

### Custom comparison for case-insensitive string matching

```typescript
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // Use default behavior for non-strings
};

isMatchWith({ name: 'JOHN', age: 30 }, { name: 'john' }, caseInsensitiveCompare); // true
```

### Custom comparison for range matching

```typescript
// Custom comparison for range matching
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true
```
