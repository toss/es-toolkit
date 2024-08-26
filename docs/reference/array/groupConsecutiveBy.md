# groupConsecutiveBy

Groups the consecutive elements (like discriminated unions, but not limit only discriminated unions)
of an array based on a provided key-generating function.

This function takes an array and a function that generates a key from each element. It returns
a array where the keys are the generated keys and the values are arrays of elements that share
the same key.

## Signature

```typescript
function groupConsecutiveBy<T, K extends PropertyKey>(arr: T[], getKeyFromItem: (item: T) => K): T[][];
```

### Parameters

- `arr` (`T[]`): The array to group.
- `getKeyFromItem` (`(item: T) => K`): A function that generates a key from an element.

### Returns

(`T[][]`) A array where sub element is an array of elements that
share that key and are consecutive neighbors in the original array (also order preserved).

## Examples

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
  { category: 'vegetable', name: 'tomato' }
  { category: 'fruit', name: 'orange' }
];
const result = groupConsecutiveBy(array, item => item.category);
// result will be:
// [
//   [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   [
//     { category: 'vegetable', name: 'carrot' }
//     { category: 'vegetable', name: 'tomato' }
//   ],
//   [
//     { category: 'fruit', name: 'orange' }
//   ]
// ]
```
