# findKey

Finds the key of the first element that satisfies the given condition.

```typescript
const key = findKey(obj, predicate);
```

## Reference

### `findKey(obj, predicate)`

Use `findKey` when you want to find the key of the first element in an object that satisfies a specific condition. It returns the key for the first value where the condition function returns `true`.

```typescript
import { findKey } from 'es-toolkit/object';

// Find the first user under 30 years old
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

const youngUserKey = findKey(users, user => user.age < 30);
console.log(youngUserKey); // 'alice'

// Find an inactive user
const inactiveUserKey = findKey(users, user => !user.active);
console.log(inactiveUserKey); // 'bob'

// When no element satisfies the condition
const seniorUserKey = findKey(users, user => user.age > 50);
console.log(seniorUserKey); // undefined
```

The condition function receives the current value, key, and the entire object.

```typescript
const data = {
  item1: { priority: 'high', status: 'pending' },
  item2: { priority: 'low', status: 'done' },
  item3: { priority: 'high', status: 'done' },
};

// Search considering both key name and value
const result = findKey(data, (value, key, obj) => {
  return key.includes('2') && value.status === 'done';
});
console.log(result); // 'item2'
```

Can also be used with complex object structures.

```typescript
const products = {
  laptop: {
    specs: { ram: 16, cpu: 'Intel i7' },
    price: 1200,
    available: true,
  },
  phone: {
    specs: { ram: 8, cpu: 'Snapdragon' },
    price: 800,
    available: false,
  },
  tablet: {
    specs: { ram: 12, cpu: 'Apple M1' },
    price: 1000,
    available: true,
  },
};

const affordableKey = findKey(products, product => product.price < 1000 && product.available);
console.log(affordableKey); // undefined (no product satisfies the condition)

const highRamKey = findKey(products, product => product.specs.ram >= 12);
console.log(highRamKey); // 'laptop'
```

#### Parameters

- `obj` (`T extends Record<any, any>`): The object to search.
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): A condition function to execute for each element. Finds the key of the first element that returns `true`.

#### Returns

(`keyof T | undefined`): The key of the first element that satisfies the condition. Returns `undefined` if no element satisfies the condition.
