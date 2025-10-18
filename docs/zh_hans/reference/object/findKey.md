# findKey

查找满足给定条件的第一个元素的键。

```typescript
const key = findKey(obj, predicate);
```

## 参考

### `findKey(obj, predicate)`

当您想在对象中查找满足特定条件的第一个元素的键时,请使用 `findKey`。它返回条件函数返回 `true` 的第一个值的键。

```typescript
import { findKey } from 'es-toolkit/object';

// 查找年龄小于 30 的第一个用户
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

const youngUserKey = findKey(users, user => user.age < 30);
console.log(youngUserKey); // 'alice'

// 查找非活跃用户
const inactiveUserKey = findKey(users, user => !user.active);
console.log(inactiveUserKey); // 'bob'

// 没有满足条件的元素
const seniorUserKey = findKey(users, user => user.age > 50);
console.log(seniorUserKey); // undefined
```

条件函数接收当前值、键和整个对象。

```typescript
const data = {
  item1: { priority: 'high', status: 'pending' },
  item2: { priority: 'low', status: 'done' },
  item3: { priority: 'high', status: 'done' },
};

// 同时考虑键名和值的搜索
const result = findKey(data, (value, key, obj) => {
  return key.includes('2') && value.status === 'done';
});
console.log(result); // 'item2'
```

也可以用于复杂的对象结构。

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
console.log(affordableKey); // undefined (没有满足条件的产品)

const highRamKey = findKey(products, product => product.specs.ram >= 12);
console.log(highRamKey); // 'laptop'
```

#### 参数

- `obj` (`T extends Record<any, any>`): 要搜索的对象。
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 对每个元素执行的条件函数。查找返回 `true` 的第一个元素的键。

#### 返回值

(`keyof T | undefined`): 满足条件的第一个元素的键。如果没有满足条件的元素,则返回 `undefined`。
