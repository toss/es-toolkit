# groupBy

Groups the elements of an array based on a provided key-generating function or property key.

This function takes an array and either a function that generates a key from each element or a string property key. It returns an object where the keys are the generated keys and the values are arrays of elements that share the same key.

## Signature

```typescript
function groupBy<T, K extends PropertyKey>(arr: T[], keyOrFn: ((item: T) => K) | keyof T): Record<K, T[]>;
```

### Parameters

- `arr` (`T[]`): The array to group.
- `keyOrFn` (`((item: T) => K) | keyof T`): Either a function that generates a key from an element, or a string property key to group by.

### Returns

(`Record<K, T[]>`) An object where each key is associated with an array of elements that share that key.

## Examples

Using a key-generating function:

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = groupBy(array, item => item.category);
// result will be:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```

Using a property key:

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = groupBy(array, 'category');
// Results in the same output as above
```
