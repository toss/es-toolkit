# keyBy

Maps each element of an array based on a provided key-generating function.

This function takes an array and a function that generates a key from each element. It returns
an object where the keys are the generated keys and the values are the corresponding elements.
If there are multiple elements generating the same key, the last element among them is used as the value.

## Signature

```typescript
function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T>;
```

### Parameters

- `arr` (`T[]`): The array of elements to be mapped.
- `getKeyFromItem` (`(item: T) => K`): A function that generates a key from an element.

### Returns

(`Record<K, T>`) An object where keys are mapped to each element of an array.

## Examples

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = keyBy(array, item => item.category);
// result will be:
// {
//   fruit: { category: 'fruit', name: 'banana' },
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```
