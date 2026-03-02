# keyBy

Returns a new object with array elements converted to key-value pairs using a key-generating function.

```typescript
const result = keyBy(arr, getKeyFromItem);
```

## Usage

### `keyBy(arr, getKeyFromItem)`

Use `keyBy` when you want to create a key-indexed object for quick lookup of each element in an array. By providing a function that generates a unique key from each element, it creates an object where you can access elements using that key. If multiple elements generate the same key, the last element is used.

```typescript
import { keyBy } from 'es-toolkit/array';

// Use object's id property as key
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
keyBy(users, user => user.id);
// Returns: {
//   1: { id: 1, name: 'john' },
//   2: { id: 2, name: 'jane' },
//   3: { id: 3, name: 'bob' }
// }

// Use string property as key
const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
keyBy(products, item => item.category);
// Returns: {
//   fruit: { category: 'fruit', name: 'banana' }, // Last fruit element
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```

Complex key generation logic can also be used.

```typescript
import { keyBy } from 'es-toolkit/array';

// Combine multiple properties to create a key
const orders = [
  { date: '2023-01-01', customerId: 1, amount: 100 },
  { date: '2023-01-01', customerId: 2, amount: 200 },
  { date: '2023-01-02', customerId: 1, amount: 150 },
];
keyBy(orders, order => `${order.date}-${order.customerId}`);
// Returns: {
//   '2023-01-01-1': { date: '2023-01-01', customerId: 1, amount: 100 },
//   '2023-01-01-2': { date: '2023-01-01', customerId: 2, amount: 200 },
//   '2023-01-02-1': { date: '2023-01-02', customerId: 1, amount: 150 }
// }
```

#### Parameters

- `arr` (`readonly T[]`): The array to convert to an object.
- `getKeyFromItem` (`(item: T, index: number, array: T[]) => K`): A function that generates a key from each element, its index, and the array.

#### Returns

(`Record<K, T>`): Returns an object with the generated keys as property names and the corresponding elements as values. If multiple elements generate the same key, the last element is used as the value.

## Examples

```typescript
// Using index parameter
const items = ['a', 'b', 'c'];
const result = keyBy(items, (item, index) => index);
// Returns: { 0: 'a', 1: 'b', 2: 'c' }

// Using array parameter
const numbers = [10, 20, 30];
const result2 = keyBy(numbers, (item, index, arr) => (item > arr[0] ? 'large' : 'small'));
// Returns: { small: 10, large: 30 }
```
