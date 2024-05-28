# groupBy

Groups the elements of an array based on a provided key-generating function.

This function takes an array and a function that generates a key from each element. It returns 
an object where the keys are the generated keys and the values are arrays of elements that share 
the same key.


## Signature

```typescript
function groupBy<T, K extends string>(arr: T[], getKeyFromItem: (item: T) => K): Record<K, T[]>;
```

### Parameters 

- `arr` (`T[]`): The array to group.
- `getKeyFromItem` (`(item: T) => K`): A function that generates a key from an element.

### Returns

(`Record<K, T[]>`) An object where each key is associated with an array of elements that 
share that key.

## Examples

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
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
