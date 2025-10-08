# flattenObject

Flattens a nested object into a single-level object with dot-separated keys or directly into a Map.

- `Array`s are flattened.
- Non-plain objects, like `Buffer`s or `TypedArray`s, are not flattened.

## Signature

```typescript
// Return Record<string, any>
function flattenObject(object: object, options?: { delimiter?: string }): Record<string, any>;

// Return Map<string, any> (legacy syntax)
function flattenObject(object: object, target: Map<string, any>): Map<string, any>;

// Return Map<string, any> (with custom delimiter)
function flattenObject(object: object, options: { delimiter?: string; target: Map<string, any> }): Map<string, any>;
```

### Parameters

- `object` (`object`): The object to flatten.
- `options` (`object`, optional): The options object.
  - `delimiter` (`string`): The delimiter to use between nested keys. Defaults to `'.'`.
  - `target` (`Map<string, any>`): The target Map to populate with flattened key-value pairs.

### Returns

(`Record<string, any> | Map<string, any>`): The flattened object or Map.

## Examples

### Basic Usage (Record)

```typescript
const nestedObject = {
  a: {
    b: {
      c: 1,
    },
  },
  d: [2, 3],
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
// Output:
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3
// }
```

### Custom Delimiter (Record)

```typescript
const flattened = flattenObject(nestedObject, { delimiter: '/' });
console.log(flattened);
// Output:
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3
// }
```

### Map Target (Legacy Syntax)

```typescript
const map = flattenObject(nestedObject, new Map());
console.log(map);
// Output: Map { 'a.b.c' => 1, 'd.0' => 2, 'd.1' => 3 }

// Access values
console.log(map.get('a.b.c')); // 1
console.log(map.size); // 3
```

### Map with Custom Delimiter

```typescript
const customMap = flattenObject(nestedObject, {
  delimiter: '_',
  target: new Map(),
});
console.log(customMap);
// Output: Map { 'a_b_c' => 1, 'd_0' => 2, 'd_1' => 3 }
```

### Performance Comparison

Using Map targets provides better performance compared to converting Records to Maps:

```typescript
// Slower: Object → Array → Map (3 steps)
const slowMap = new Map(Object.entries(flattenObject(largeObject)));

// Faster: Object → Map (1 step)
const fastMap = flattenObject(largeObject, new Map());
```
